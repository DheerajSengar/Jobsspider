const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '1234';
const dbName = process.env.DB_NAME || 'jobsspider';

const poolConfig = {
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    multipleStatements: true,
    connectionLimit: process.env.DB_CONNECTION_LIMIT ? parseInt(process.env.DB_CONNECTION_LIMIT, 10) : 20,
    waitForConnections: true,
    queueLimit: 0
};

if (process.env.DB_SSL === 'true' || (dbHost !== 'localhost' && dbHost !== '127.0.0.1')) {
    poolConfig.ssl = {
        rejectUnauthorized: false
    };
}

const pool = mysql.createPool(poolConfig);

// Helper function to safely apply non-destructive migrations for legacy tables
async function runAutoMigrations(promisePool) {
    try {
        // 1. Check if 'users' table exists and needs modernization
        const [tables] = await promisePool.query("SHOW TABLES LIKE 'users'");
        if (tables.length > 0) {
            const [userCols] = await promisePool.query('SHOW COLUMNS FROM users');
            const colNames = userCols.map(c => c.Field);

            // Fix space in column name ' username'
            const spaceUserCol = userCols.find(c => c.Field.trim() === 'username' && c.Field !== 'username');
            if (spaceUserCol) {
                await promisePool.query("ALTER TABLE `users` CHANGE COLUMN `" + spaceUserCol.Field + "` `username` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL");
            }

            // Ensure userid INT AUTO_INCREMENT PRIMARY KEY exists
            if (!colNames.includes('userid')) {
                const [pkIndex] = await promisePool.query("SHOW INDEXES FROM users WHERE Key_name = 'PRIMARY'");
                if (pkIndex.length > 0) {
                    await promisePool.query("ALTER TABLE `users` DROP PRIMARY KEY, ADD COLUMN `userid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST");
                } else {
                    await promisePool.query("ALTER TABLE `users` ADD COLUMN `userid` INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST");
                }
            }

            // Ensure unique constraints exist
            const [userIndexes] = await promisePool.query("SHOW INDEXES FROM users");
            const indexNames = userIndexes.map(i => i.Key_name);
            if (!indexNames.includes('unique_user_email') && !indexNames.includes('emailaddress')) {
                try {
                    await promisePool.query("ALTER TABLE `users` ADD UNIQUE KEY `unique_user_email` (`emailaddress`)");
                } catch (idxErr) { /* ignore if already covered */ }
            }
            if (!indexNames.includes('unique_user_mobile') && !indexNames.includes('mobileno')) {
                try {
                    await promisePool.query("ALTER TABLE `users` ADD UNIQUE KEY `unique_user_mobile` (`mobileno`)");
                } catch (idxErr) { /* ignore if already covered */ }
            }

            // Add missing user profile columns
            const [updatedUserCols] = await promisePool.query('SHOW COLUMNS FROM users');
            const updatedColNames = updatedUserCols.map(c => c.Field);
            // Ensure password column is large enough for bcrypt hashes
            await promisePool.query("ALTER TABLE `users` MODIFY COLUMN `password` VARCHAR(255) DEFAULT NULL");
            if (!updatedColNames.includes('picture')) await promisePool.query("ALTER TABLE `users` ADD COLUMN `picture` VARCHAR(255) DEFAULT NULL");
            if (!updatedColNames.includes('google_id')) await promisePool.query("ALTER TABLE `users` ADD COLUMN `google_id` VARCHAR(100) DEFAULT NULL");
            if (!updatedColNames.includes('resume_url')) await promisePool.query("ALTER TABLE `users` ADD COLUMN `resume_url` VARCHAR(255) DEFAULT NULL");
            if (!updatedColNames.includes('headline')) await promisePool.query("ALTER TABLE `users` ADD COLUMN `headline` VARCHAR(255) DEFAULT NULL");
            if (!updatedColNames.includes('skills')) await promisePool.query("ALTER TABLE `users` ADD COLUMN `skills` TEXT DEFAULT NULL");
            if (!updatedColNames.includes('created_at')) await promisePool.query("ALTER TABLE `users` ADD COLUMN `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP");
        }

        // 2. Check if 'companies' table exists and needs registrationno column
        const [compTables] = await promisePool.query("SHOW TABLES LIKE 'companies'");
        if (compTables.length > 0) {
            const [compCols] = await promisePool.query('SHOW COLUMNS FROM companies');
            const compColNames = compCols.map(c => c.Field);
            if (!compColNames.includes('registrationno')) {
                await promisePool.query("ALTER TABLE `companies` ADD COLUMN `registrationno` VARCHAR(100) DEFAULT NULL");
                if (compColNames.includes('registrationnumber')) {
                    await promisePool.query("UPDATE `companies` SET `registrationno` = `registrationnumber` WHERE `registrationno` IS NULL");
                }
            }
            if (!compColNames.includes('description') && compColNames.includes('descripition')) {
                await promisePool.query("ALTER TABLE `companies` ADD COLUMN `description` TEXT DEFAULT NULL");
                await promisePool.query("UPDATE `companies` SET `description` = `descripition` WHERE `description` IS NULL");
            }
            await promisePool.query("ALTER TABLE `companies` MODIFY COLUMN `password` VARCHAR(255) DEFAULT NULL");
        }

        // 3. Check if 'jobspider_admin' table exists and needs adminid column
        const [adminTables] = await promisePool.query("SHOW TABLES LIKE 'jobspider_admin'");
        if (adminTables.length > 0) {
            const [adminCols] = await promisePool.query('SHOW COLUMNS FROM jobspider_admin');
            const adminColNames = adminCols.map(c => c.Field);
            if (!adminColNames.includes('adminid')) {
                await promisePool.query("ALTER TABLE `jobspider_admin` ADD COLUMN `adminid` INT NOT NULL AUTO_INCREMENT UNIQUE FIRST");
            }
            if (!adminColNames.includes('adminname')) {
                await promisePool.query("ALTER TABLE `jobspider_admin` ADD COLUMN `adminname` VARCHAR(100) DEFAULT 'Admin'");
            }
            await promisePool.query("ALTER TABLE `jobspider_admin` MODIFY COLUMN `password` VARCHAR(255) DEFAULT NULL");
        }
    } catch (migErr) {
        console.warn('Notice during auto-migrations:', migErr.message);
    }
}

// Helper function to ensure database exists, auto-initialize DB schema and default admin
async function initDb() {
    try {
        // First, ensure the database exists (for local MySQL instances)
        if (dbHost === 'localhost' || dbHost === '127.0.0.1') {
            try {
                const rootConn = await mysql.createConnection({
                    host: dbHost,
                    port: dbPort,
                    user: dbUser,
                    password: dbPassword
                }).promise();
                await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
                await rootConn.end();
            } catch (rootErr) {
                console.warn('Notice: Could not auto-create database (might already exist or restricted permissions):', rootErr.message);
            }
        }

        const promisePool = pool.promise();

        // Run auto-migrations before executing full schema to prevent foreign key errors
        await runAutoMigrations(promisePool);

        const schemaPath = path.join(__dirname, '../schema.sql');
        if (fs.existsSync(schemaPath)) {
            const sql = fs.readFileSync(schemaPath, 'utf8');
            await promisePool.query(sql);
            console.log('✅ Database schema and seeds initialized successfully');
        }

        // Seed default admin if none exists
        const [admins] = await promisePool.query('SELECT * FROM jobspider_admin LIMIT 1');
        if (admins.length === 0) {
            const hashedPw = await bcrypt.hash('admin123', 10);
            await promisePool.query(
                'INSERT INTO jobspider_admin (adminname, emailid, mobileno, password) VALUES (?, ?, ?, ?)',
                ['Super Admin', 'admin@jobspider.com', '9999999999', hashedPw]
            );
            console.log('✅ Seeded default admin account (admin@jobspider.com / admin123)');
        }
    } catch (err) {
        console.error('⚠️ Database Initialization Warning/Error:', err.message);
    }
}

// Fire async DB initialization on module load
initDb();

module.exports = pool;