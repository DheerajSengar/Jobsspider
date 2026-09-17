-- JobSpider Database Schema

CREATE TABLE IF NOT EXISTS jobspider_admin (
  adminid INT AUTO_INCREMENT PRIMARY KEY,
  adminname VARCHAR(100) DEFAULT 'Admin',
  emailid VARCHAR(150) UNIQUE NOT NULL,
  mobileno VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  userid INT AUTO_INCREMENT PRIMARY KEY,
  mobileno VARCHAR(20) UNIQUE NOT NULL,
  emailaddress VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255),
  username VARCHAR(100),
  picture VARCHAR(255),
  google_id VARCHAR(100),
  resume_url VARCHAR(255),
  headline VARCHAR(255),
  skills TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS state (
  stateid INT AUTO_INCREMENT PRIMARY KEY,
  statename VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS city (
  cityid INT AUTO_INCREMENT PRIMARY KEY,
  stateid INT NOT NULL,
  cityname VARCHAR(100) NOT NULL,
  FOREIGN KEY (stateid) REFERENCES state(stateid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS category (
  categoryid INT AUTO_INCREMENT PRIMARY KEY,
  categoryname VARCHAR(100) NOT NULL,
  categorypicture VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS subcategory (
  subcategoryid INT AUTO_INCREMENT PRIMARY KEY,
  categoryid INT NOT NULL,
  subcategoryname VARCHAR(100) NOT NULL,
  subcategorypicture VARCHAR(255),
  FOREIGN KEY (categoryid) REFERENCES category(categoryid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS companies (
  companyid INT AUTO_INCREMENT PRIMARY KEY,
  companyname VARCHAR(150) NOT NULL,
  companyowner VARCHAR(100),
  companyaddress TEXT,
  stateid INT,
  cityid INT,
  emailid VARCHAR(150),
  mobileno VARCHAR(20),
  contactperson VARCHAR(100),
  aboutcompany TEXT,
  registrationno VARCHAR(100),
  pancard VARCHAR(50),
  password VARCHAR(255),
  verified VARCHAR(20) DEFAULT 'Unverified',
  logo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS requiredskills (
  skillid INT AUTO_INCREMENT PRIMARY KEY,
  categoryid INT,
  subcategoryid INT,
  skills TEXT
);

CREATE TABLE IF NOT EXISTS jobtype (
  jobtypeid INT AUTO_INCREMENT PRIMARY KEY,
  jobtype VARCHAR(100) NOT NULL UNIQUE,
  picture VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS company_jobs (
  jobid INT AUTO_INCREMENT PRIMARY KEY,
  companyid INT NOT NULL,
  categoryid INT NOT NULL,
  subcategoryid INT NOT NULL,
  skills TEXT,
  educationqualification VARCHAR(255),
  benifits TEXT,
  experience VARCHAR(100),
  jobdeatails TEXT,
  jobtype VARCHAR(100),
  minsalary DECIMAL(12,2) DEFAULT 0,
  maxsalary DECIMAL(12,2) DEFAULT 0,
  schedule VARCHAR(100),
  worklocationcity VARCHAR(100),
  supplementalpay VARCHAR(100),
  postdate DATE,
  applicationdeadline DATE,
  expectedstart DATE,
  applicationquestion TEXT,
  contactperson VARCHAR(100),
  emailaddress VARCHAR(150),
  mobileno VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_applications (
  applicationid INT AUTO_INCREMENT PRIMARY KEY,
  jobid INT NOT NULL,
  userid INT NOT NULL,
  user_email VARCHAR(150),
  user_phone VARCHAR(20),
  resume_url VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Applied',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (jobid) REFERENCES company_jobs(jobid) ON DELETE CASCADE,
  FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS saved_jobs (
  savedid INT AUTO_INCREMENT PRIMARY KEY,
  jobid INT NOT NULL,
  userid INT NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_job (userid, jobid),
  FOREIGN KEY (jobid) REFERENCES company_jobs(jobid) ON DELETE CASCADE,
  FOREIGN KEY (userid) REFERENCES users(userid) ON DELETE CASCADE
);

INSERT IGNORE INTO state (stateid, statename) VALUES
(1, 'Madhya Pradesh'),
(2, 'Maharashtra'),
(3, 'Delhi'),
(4, 'Karnataka'),
(5, 'Tamil Nadu');

INSERT IGNORE INTO city (cityid, stateid, cityname) VALUES
(1, 1, 'Gwalior'),
(2, 1, 'Bhopal'),
(3, 1, 'Indore'),
(4, 2, 'Mumbai'),
(5, 2, 'Pune'),
(6, 3, 'New Delhi'),
(7, 4, 'Bengaluru'),
(8, 5, 'Chennai');

INSERT IGNORE INTO category (categoryid, categoryname, categorypicture) VALUES
(1, 'Information Technology (IT)', 'category.png'),
(2, 'Sales & Marketing', 'category.png'),
(3, 'Finance & Accounting', 'category.png'),
(4, 'Human Resources (HR)', 'category.png'),
(5, 'Design & Creative', 'category.png');

INSERT IGNORE INTO subcategory (subcategoryid, categoryid, subcategoryname, subcategorypicture) VALUES
(1, 1, 'Full Stack Web Development', 'subcategory.png'),
(2, 1, 'Data Science & Analytics', 'subcategory.png'),
(3, 2, 'Digital Marketing & SEO', 'subcategory.png'),
(4, 2, 'Business Development & Sales', 'subcategory.png'),
(5, 3, 'Accounting & Taxation', 'subcategory.png'),
(6, 4, 'Talent Acquisition & HR', 'subcategory.png'),
(7, 5, 'UI/UX & Graphic Design', 'subcategory.png');

INSERT IGNORE INTO requiredskills (skillid, categoryid, subcategoryid, skills) VALUES
(1, 1, 1, 'Full Stack Developer (MERN / Java / Python)'),
(2, 1, 1, 'Frontend Developer (React.js / Next.js)'),
(3, 1, 1, 'Backend Developer (Node.js / Express / Java)'),
(4, 1, 2, 'Data Analyst & SQL'),
(5, 2, 3, 'Digital Marketing & Performance Ads'),
(6, 2, 4, 'Sales Executive & Client Relations'),
(7, 3, 5, 'Accountant & Tally / GST'),
(8, 4, 6, 'HR Executive & Recruitment'),
(9, 5, 7, 'UI/UX Designer (Figma / Adobe XD)');
