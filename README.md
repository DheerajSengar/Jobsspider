# JobSpider - Full-Stack Production Job Portal

JobSpider is a production-grade full-stack web application designed to connect job seekers with employers. It provides job searching, advanced filtering by category/subcategory/experience/posted date, job applications, job bookmarking, candidate management, and a dedicated Admin Dashboard for managing companies, verification, skills, categories, and job postings.

---

## Features

### Job Seekers
- **User Registration & Login**: Phone/Email verification and Google OAuth 2.0 Sign-In.
- **Job Search & Advanced Filtering**: Filter jobs by category, subcategory, experience level, salary range, location, and post date.
- **Job Details & Application**: View full job specifications, company profile, and submit applications.
- **Bookmarked Jobs**: Save interesting job postings for later review.
- **Application History**: Track status of submitted job applications.

### Employers & Administrators
- **Admin Dashboard**: Full CRUD management of job categories, subcategories, job skills, and companies.
- **Company Verification**: Review and manage company verification status.
- **Job Management**: Create, edit, and monitor active job postings.
- **Security & Authorization**: Role-based access control protecting administrative endpoints via JWT token verification.

---

## Tech Stack

- **Frontend**: React 18, Material UI (MUI 6), Redux, React Router v6, Axios, SweetAlert2, `@react-oauth/google`
- **Backend**: Node.js, Express 4, `mysql2` (Connection Pool & SSL Support), JWT (`jsonwebtoken`), Bcrypt (`bcryptjs`), `google-auth-library`
- **Database**: MySQL 8.0 / Cloud MySQL (e.g. Aiven MySQL)
- **Deployment**: Express serves React build bundle for single-service deployment on Render.

---

## Project Structure

```
Jobsspider/
├── build/                      # Production build output of React frontend
├── jobsspider_backend/         # Express API Backend
│   ├── bin/www                 # Server entry point
│   ├── middleware/             # Auth middleware (verifyToken, verifyAdmin)
│   ├── routes/                 # Express API routes (admin, userinterface, companyjobs, etc.)
│   ├── schema.sql              # Database DDL schema & seed data
│   ├── app.js                  # Express application setup
│   └── pool.js                 # MySQL pool & automatic schema initializer
├── public/                     # Public static assets
├── src/                        # React Frontend Source
│   ├── admin/                  # Admin dashboard components & views
│   ├── userinterface/          # User-facing job seeker pages & components
│   ├── services/               # API service helpers & Redux store
│   ├── App.js                  # Main Application router
│   └── index.js                # React root renderer
├── .env.example                # Frontend/Root environment template
└── package.json                # Project dependencies & npm scripts
```

---

## Local Setup

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- MySQL Server 8.0+ running locally or access to a cloud MySQL instance (e.g., Aiven MySQL)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/Jobsspider.git
cd Jobsspider

# Install frontend & root dependencies
npm install

# Install backend dependencies
cd jobsspider_backend
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root folder and in `jobsspider_backend/.env` based on `.env.example`:

```env
PORT=5000
NODE_ENV=development

# MySQL Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=defaultdb
DB_SSL=false

# Authentication
JWT_SECRET=jobspider_super_secret_jwt_key_2026
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URLs
FRONTEND_URL=http://localhost:3000
REACT_APP_SERVER_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### 4. Database Setup
The backend automatically executes `schema.sql` on startup if tables do not exist, and creates the default super admin account if none exists.
- Default Admin Credentials: `admin@jobspider.com` / `admin123`

### 5. Running the Application
```bash
# Start backend API (runs on http://localhost:5000)
cd jobsspider_backend
npm start

# In a separate terminal, start frontend dev server (runs on http://localhost:3000)
npm start
```

---

## Database Setup & Cloud MySQL (Aiven)

### Schema & Initial Seeding
The DDL script is located at `jobsspider_backend/schema.sql`. It defines:
- `jobspider_admin`: Admin credentials table
- `users`: User profiles and Google OAuth mapping
- `companies`: Company registrations and verification status
- `category`, `subcategory`, `requiredskills`: Job classification structure
- `company_jobs`: Job posting details
- `job_applications` & `saved_jobs`: User interactions

### Cloud MySQL Setup (Aiven)
1. Create a MySQL database service on [Aiven.io](https://aiven.io/).
2. Copy the host, port (e.g., `12345`), username (`avroots`), password, and database name from Aiven Console.
3. In your Render / Production Environment variables, set:
   - `DB_HOST=<aiven-host>.aivencloud.com`
   - `DB_PORT=<aiven-port>`
   - `DB_USER=avroots`
   - `DB_PASSWORD=<aiven-password>`
   - `DB_NAME=defaultdb`
   - `DB_SSL=true`
4. The database pool will automatically enable SSL encryption (`rejectUnauthorized: false`) for remote cloud database connections.

---

## Google Sign-In Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a Project and navigate to **APIs & Services > Credentials**.
3. Click **Create Credentials > OAuth client ID** (Application type: Web application).
4. Configure Authorized JavaScript origins:
   - `http://localhost:3000`
   - `http://localhost:5000`
   - `https://<your-render-app>.onrender.com`
5. Configure Authorized redirect URIs:
   - `http://localhost:3000`
   - `https://<your-render-app>.onrender.com`
6. Copy the Client ID and set `REACT_APP_GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_ID`.

---

## Deployment Guide (Render)

JobSpider is structured so that Express can serve the React static build, allowing full-stack deployment on a single Render Web Service.

### Backend & Unified Web Service Settings on Render
- **Environment**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Environment Variables to add in Render Dashboard**:
  - `PORT`: `10000` (or left to Render default)
  - `NODE_ENV`: `production`
  - `DB_HOST`: `<your-cloud-mysql-host>`
  - `DB_PORT`: `<your-cloud-mysql-port>`
  - `DB_USER`: `<your-cloud-mysql-user>`
  - `DB_PASSWORD`: `<your-cloud-mysql-password>`
  - `DB_NAME`: `defaultdb`
  - `DB_SSL`: `true`
  - `JWT_SECRET`: `<secure-random-string>`
  - `GOOGLE_CLIENT_ID`: `<your-google-client-id>`
  - `REACT_APP_GOOGLE_CLIENT_ID`: `<your-google-client-id>`

---

## Audit & Fixes Log

The following improvements and bug fixes were completed during the full technical audit:

1. **Security & Authorization**:
   - Implemented `verifyAdmin` middleware on administrative mutation endpoints in `category.js`, `subcategory.js`, `company.js`, `companyjobs.js`, and `requiredskills.js` to prevent unauthorized API requests.
   - Enforced password hashing with `bcryptjs` on user and admin account creation.
2. **Frontend Quality & UI/UX**:
   - Removed intrusive debug `alert()` popups in authentication flows (e.g. `EmailVerify.js`).
   - Fixed direct Redux state mutation in registration flow.
   - Corrected branding references (replaced leftover "Indeed" text with "JobsSpider").
   - Added user feedback using SweetAlert2 toast notifications across all user actions.
3. **Google OAuth 2.0 Integration**:
   - Integrated `@react-oauth/google` and verified token parsing on backend using `google-auth-library`.
   - Created fallback mechanism to automatically register Google users upon initial sign-in.
4. **Cloud Database & Deployment Readiness**:
   - Enhanced `pool.js` with conditional SSL support for Aiven MySQL and other remote MySQL providers.
   - Configured Express static build fallback to serve React single-page app routes smoothly in production.

---

## Database Fixes

### 1. Root Cause of Foreign-Key Error
When starting JobSpider, database initialization threw the error:
`Failed to add the foreign key constraint. Missing column 'userid' for constraint 'job_applications_ibfk_2' in the referenced table 'users'`

- **Why it occurred**: The existing MySQL database contained a legacy `users` table created with composite primary key `(mobileno, emailaddress)` and a misformatted column `` ` username` `` (leading space and `armscii8` collation), with **no `userid` column**.
- When `schema.sql` executed `CREATE TABLE IF NOT EXISTS job_applications`, MySQL attempted to construct the foreign key constraint `FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE`.
- Because the referenced table `users` had no column named `userid`, MySQL rejected the constraint and failed to create `job_applications` and `saved_jobs`.

### 2. Tables & Columns Involved
| Table | Original State in DB | Expected / Fixed State | Purpose |
| :--- | :--- | :--- | :--- |
| `users` | PK `(mobileno, emailaddress)`, `` ` username` ``, `password VARCHAR(45)`, no `userid` | `userid INT AUTO_INCREMENT PRIMARY KEY`, `username VARCHAR(100)`, `password VARCHAR(255)`, `emailaddress VARCHAR(150) UNIQUE`, `mobileno VARCHAR(20) UNIQUE`, plus profile fields (`picture`, `google_id`, `resume_url`, `headline`, `skills`, `created_at`) | Matches application models and provides single numeric identifier for foreign keys |
| `job_applications` | Not created | `applicationid INT AUTO_INCREMENT PRIMARY KEY`, `jobid INT NOT NULL` (FK -> `company_jobs.jobid`), `userid INT NOT NULL` (FK -> `users.userid`) | Stores candidate job applications with cascade deletion |
| `saved_jobs` | Not created | `savedid INT AUTO_INCREMENT PRIMARY KEY`, `jobid INT NOT NULL` (FK -> `company_jobs.jobid`), `userid INT NOT NULL` (FK -> `users.userid`), `UNIQUE KEY (userid, jobid)` | Stores user bookmarked jobs with cascade deletion |
| `companies` | `registrationnumber VARCHAR(45)`, `descripition VARCHAR(45)` | `registrationno VARCHAR(100)`, `description TEXT`, `password VARCHAR(255)` | Matches column names expected in `company.js` routes |
| `jobspider_admin` | PK `(emailid, mobileno)`, no `adminid` | `adminid INT AUTO_INCREMENT UNIQUE`, `adminname VARCHAR(100)`, `password VARCHAR(255)` | Provides numeric `adminid` for JWT authentication token generation |

### 3. What Was Changed
1. **Users Schema Modernization (Non-Destructive)**:
   - Added `userid INT AUTO_INCREMENT PRIMARY KEY` while preserving all existing user accounts.
   - Renamed `` ` username` `` to clean `username VARCHAR(100)` with `utf8mb4` encoding.
   - Expanded `password` to `VARCHAR(255)` to support standard 60-character bcrypt password hashes.
   - Added `UNIQUE` constraints on `emailaddress` and `mobileno`.
2. **Tables Created**:
   - Created `job_applications` with `FOREIGN KEY (jobid) REFERENCES company_jobs(jobid) ON DELETE CASCADE` and `FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE`.
   - Created `saved_jobs` with `FOREIGN KEY (jobid) REFERENCES company_jobs(jobid) ON DELETE CASCADE` and `FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE`.
3. **Automated Non-Destructive Migrations in `pool.js`**:
   - Added `runAutoMigrations()` inside `jobsspider_backend/routes/pool.js` that checks for legacy schemas before applying DDL statements, guaranteeing compatibility on both fresh and existing local/cloud MySQL instances.

### 4. Why the New Relationship is Correct
- **Data Integrity**: Using `users.userid (INT)` as the single primary key aligns with `job_applications.userid (INT)` and `saved_jobs.userid (INT)`, enabling standard indexed joins (`A.userid = U.userid`).
- **Cascade Behavior**: Setting `ON DELETE CASCADE` ensures that when a user account is deleted, their associated applications and bookmarks are cleaned up automatically without leaving broken orphan records.
- **ORM / JWT Token Standard**: Both authentication tokens and frontend payload representations use `{ userid: ... }`, which is consistent across all API endpoints.

### 5. How to Initialize a Fresh Database
For a clean database setup:
1. Ensure MySQL is running and configured in `jobsspider_backend/.env`.
2. Start the backend:
   ```bash
   cd jobsspider_backend
   npm start
   ```
3. The server automatically creates the database (if local), creates all tables with proper foreign key constraints, and seeds default master data and the default super admin account.

### 6. Manual Migration / SQL Commands (if required on existing DB)
```sql
-- 1. Modernize Users Table
ALTER TABLE users 
  CHANGE COLUMN ` username` username VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  DROP PRIMARY KEY,
  ADD COLUMN userid INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST,
  ADD UNIQUE KEY unique_user_email (emailaddress),
  ADD UNIQUE KEY unique_user_mobile (mobileno),
  MODIFY COLUMN password VARCHAR(255) DEFAULT NULL;

-- 2. Modernize Companies & Admin Tables
ALTER TABLE companies 
  ADD COLUMN IF NOT EXISTS registrationno VARCHAR(100) DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS description TEXT DEFAULT NULL,
  MODIFY COLUMN password VARCHAR(255) DEFAULT NULL;

ALTER TABLE jobspider_admin 
  ADD COLUMN IF NOT EXISTS adminid INT NOT NULL AUTO_INCREMENT UNIQUE FIRST,
  ADD COLUMN IF NOT EXISTS adminname VARCHAR(100) DEFAULT 'Admin',
  MODIFY COLUMN password VARCHAR(255) DEFAULT NULL;

-- 3. Create Applications & Saved Jobs Tables
CREATE TABLE IF NOT EXISTS job_applications (
  applicationid INT AUTO_INCREMENT PRIMARY KEY,
  jobid INT NOT NULL,
  userid INT NOT NULL,
  user_email VARCHAR(150),
  user_phone VARCHAR(20),
  resume_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Applied',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_job_app_jobid FOREIGN KEY (jobid) REFERENCES company_jobs(jobid) ON DELETE CASCADE,
  CONSTRAINT fk_job_app_userid FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_jobs (
  savedid INT AUTO_INCREMENT PRIMARY KEY,
  jobid INT NOT NULL,
  userid INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_job (userid, jobid),
  CONSTRAINT fk_saved_job_jobid FOREIGN KEY (jobid) REFERENCES company_jobs(jobid) ON DELETE CASCADE,
  CONSTRAINT fk_saved_job_userid FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);
```
