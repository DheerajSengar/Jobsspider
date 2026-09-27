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

-- Insert sample companies
INSERT IGNORE INTO companies (companyid, companyname, companyowner, companyaddress, stateid, cityid, emailid, mobileno, contactperson, aboutcompany, verified, logo) VALUES
(1, 'TechCorp India', 'Rajesh Kumar', '123 Tech Park, Bangalore', 4, 7, 'hr@techcorp.com', '9876543210', 'Priya Sharma', 'Leading technology company specializing in software development and IT solutions.', 'Verified', 'spider.png'),
(2, 'FinanceHub', 'Amit Patel', '456 Business Center, Mumbai', 2, 4, 'careers@financehub.com', '9876543211', 'Neha Gupta', 'Premier financial services company providing accounting and taxation services.', 'Verified', 'spider.png'),
(3, 'CreativeDesign Studio', 'Vikram Singh', '789 Design Avenue, Delhi', 3, 6, 'jobs@creativedesign.com', '9876543212', 'Anita Desai', 'Award-winning design agency specializing in UI/UX and graphic design.', 'Verified', 'spider.png'),
(4, 'SalesPro Solutions', 'Suresh Reddy', '321 Sales Tower, Chennai', 5, 8, 'hiring@salespro.com', '9876543213', 'Kavitha Raj', 'Dynamic sales and marketing company driving business growth.', 'Verified', 'spider.png'),
(5, 'HR Connect', 'Meena Krishnan', '656 HR Plaza, Pune', 2, 5, 'recruitment@hrconnect.com', '9876543214', 'Lakshmi Narayan', 'Specialized HR consultancy providing talent acquisition solutions.', 'Verified', 'spider.png'),
(6, 'InnovateTech Solutions', 'Anand Mehta', '888 Innovation Hub, Hyderabad', 1, 1, 'careers@innovatetech.com', '9876543215', 'Sunita Rao', 'Cutting-edge technology company focused on AI and machine learning solutions.', 'Verified', 'spider.png'),
(7, 'GlobalMarketing Inc', 'Rahul Sharma', '999 Marketing Tower, Kolkata', 1, 1, 'jobs@globalmarketing.com', '9876543216', 'Priya Nair', 'International marketing agency with clients across the globe.', 'Verified', 'spider.png'),
(8, 'EduTech Systems', 'Vikram Joshi', '777 Education Lane, Indore', 1, 3, 'hr@edutech.com', '9876543217', 'Meena Deshpande', 'EdTech company revolutionizing learning through technology.', 'Verified', 'spider.png');

-- Insert sample jobs
INSERT IGNORE INTO company_jobs (jobid, companyid, categoryid, subcategoryid, skills, educationqualification, benifits, experience, jobdeatails, jobtype, minsalary, maxsalary, schedule, worklocationcity, supplementalpay, postdate, applicationdeadline, expectedstart, applicationquestion, contactperson, emailaddress, mobileno) VALUES
(1, 1, 1, 1, 'React.js, Node.js, MongoDB, JavaScript', 'B.Tech/MCA in Computer Science', 'Health insurance, Remote work, Learning budget', '0-2', 'We are looking for a passionate Full Stack Developer to join our team. You will be responsible for developing and maintaining web applications using MERN stack. The ideal candidate should have strong problem-solving skills and be able to work in a fast-paced environment.', 'Full Stack Developer', 500000, 800000, 'Full-time', 'Bangalore', 'Performance bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'Why do you want to join TechCorp?', 'Priya Sharma', 'hr@techcorp.com', '9876543210'),
(2, 1, 1, 1, 'React.js, Next.js, TypeScript, CSS', 'B.Tech/MCA in Computer Science', 'Health insurance, Stock options, Gym membership', '2-4', 'Seeking an experienced Frontend Developer to build modern, responsive user interfaces using React.js and Next.js. You will work closely with our design team to implement pixel-perfect designs.', 'Frontend Developer', 600000, 1000000, 'Full-time', 'Bangalore', 'Annual bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'Describe your most challenging project.', 'Priya Sharma', 'hr@techcorp.com', '9876543210'),
(3, 1, 1, 1, 'Node.js, Express, Java, Python, SQL', 'B.Tech/MCA in Computer Science', 'Health insurance, Remote work, Conference budget', '3-5', 'Looking for a skilled Backend Developer to design and implement server-side logic and database architectures. Experience with microservices and cloud platforms is a plus.', 'Backend Developer', 700000, 1200000, 'Full-time', 'Bangalore', 'Performance bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What is your experience with scalable systems?', 'Priya Sharma', 'hr@techcorp.com', '9876543210'),
(4, 2, 3, 5, 'Tally, GST, Accounting, Excel', 'B.Com/M.Com with accounting background', 'Health insurance, PF, Professional development', '0-2', 'We need a detail-oriented Accountant to manage financial records, GST filing, and day-to-day accounting operations using Tally. Fresh graduates with strong accounting knowledge are welcome to apply.', 'Accountant', 300000, 500000, 'Full-time', 'Mumbai', 'Festival bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What accounting software are you proficient in?', 'Neha Gupta', 'careers@financehub.com', '9876543211'),
(5, 3, 5, 7, 'Figma, Adobe XD, Photoshop, Illustrator', 'B.Des/M.Des in Graphic Design', 'Health insurance, Creative freedom, Equipment budget', '1-3', 'Looking for a creative UI/UX Designer to design intuitive user interfaces and create engaging user experiences. Portfolio showcasing previous work is required.', 'UI/UX Designer', 500000, 800000, 'Full-time', 'Delhi', 'Project bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'Share your design portfolio link.', 'Anita Desai', 'jobs@creativedesign.com', '9876543212'),
(6, 4, 2, 4, 'Sales, Business Development, Communication', 'MBA/BBA in Marketing', 'Health insurance, Commission, Car allowance', '2-4', 'Seeking a dynamic Sales Executive to drive business growth, acquire new clients, and maintain relationships with existing customers. Target-oriented individuals with excellent communication skills preferred.', 'Sales Executive', 400000, 700000, 'Full-time', 'Chennai', 'Sales commission', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What is your sales strategy?', 'Kavitha Raj', 'hiring@salespro.com', '9876543213'),
(7, 5, 4, 6, 'HR, Recruitment, Communication, MS Office', 'MBA in HR or related field', 'Health insurance, PF, Learning budget', '0-2', 'Looking for an HR Executive to handle recruitment, employee relations, and HR operations. Fresh HR graduates with strong interpersonal skills are encouraged to apply.', 'HR Executive', 350000, 550000, 'Full-time', 'Pune', 'Performance bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What motivates you in HR?', 'Lakshmi Narayan', 'recruitment@hrconnect.com', '9876543214'),
(8, 1, 1, 2, 'Python, SQL, Machine Learning, Data Analysis', 'B.Tech/M.Tech in CS or Statistics', 'Health insurance, Research budget, Conference allowance', '2-4', 'Seeking a Data Analyst to analyze business data, create reports, and provide insights for decision-making. Experience with data visualization tools like Tableau or Power BI is a plus.', 'Data Analyst', 600000, 900000, 'Full-time', 'Bangalore', 'Performance bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'Describe your experience with data visualization.', 'Priya Sharma', 'hr@techcorp.com', '9876543210'),
(9, 4, 2, 3, 'Digital Marketing, SEO, Google Ads, Social Media', 'MBA/BBA in Marketing', 'Health insurance, Performance bonus, Learning budget', '1-3', 'Looking for a Digital Marketing Specialist to manage online campaigns, SEO, and social media presence. Hands-on experience with Google Analytics and Facebook Ads Manager required.', 'Digital Marketing', 400000, 650000, 'Full-time', 'Chennai', 'Campaign bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What is your experience with SEO tools?', 'Kavitha Raj', 'hiring@salespro.com', '9876543213'),
(10, 2, 3, 5, 'Accounting, Taxation, Auditing, Finance', 'B.Com/M.Com/CA Intermediate', 'Health insurance, PF, Professional development', '3-5', 'Seeking an experienced Senior Accountant to handle complex accounting, taxation, and auditing tasks. Knowledge of Indian tax laws and GST compliance is essential.', 'Senior Accountant', 500000, 800000, 'Full-time', 'Mumbai', 'Annual bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What is your experience with tax planning?', 'Neha Gupta', 'careers@financehub.com', '9876543211'),
(11, 6, 1, 1, 'Python, TensorFlow, PyTorch, Machine Learning', 'B.Tech/M.Tech in CS/AI with strong math background', 'Health insurance, Research funding, Conference sponsorship', '2-5', 'Looking for a Machine Learning Engineer to develop and deploy ML models. Experience with deep learning frameworks and cloud platforms is required.', 'Machine Learning Engineer', 800000, 1500000, 'Full-time', 'Hyderabad', 'Stock options', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'Describe a ML project you are proud of.', 'Sunita Rao', 'careers@innovatetech.com', '9876543215'),
(12, 6, 1, 2, 'Python, R, Statistics, Data Visualization', 'B.Tech/M.Sc in Statistics/CS', 'Health insurance, Learning budget, Tool subscriptions', '1-3', 'Seeking a Data Scientist to analyze complex datasets and build predictive models. Strong statistical background and programming skills required.', 'Data Scientist', 700000, 1200000, 'Full-time', 'Hyderabad', 'Performance bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What ML algorithms are you familiar with?', 'Sunita Rao', 'careers@innovatetech.com', '9876543215'),
(13, 7, 2, 3, 'SEO, SEM, Social Media Marketing, Content Strategy', 'MBA/BBA in Marketing with digital focus', 'Health insurance, Travel allowance, Creative budget', '2-4', 'Looking for a Digital Marketing Manager to lead our digital marketing initiatives. Experience with managing budgets and team leadership is essential.', 'Digital Marketing Manager', 600000, 1000000, 'Full-time', 'Kolkata', 'Profit sharing', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'How do you measure marketing ROI?', 'Priya Nair', 'jobs@globalmarketing.com', '9876543216'),
(14, 7, 2, 4, 'Sales, B2B Sales, Client Relationship Management', 'MBA/BBA with sales experience', 'Health insurance, High commission, Car allowance', '3-6', 'Seeking a Senior Sales Manager to manage key accounts and drive revenue growth. Experience in B2B sales and team management required.', 'Senior Sales Manager', 800000, 1500000, 'Full-time', 'Kolkata', 'Commission', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What is your sales track record?', 'Priya Nair', 'jobs@globalmarketing.com', '9876543216'),
(15, 8, 1, 1, 'React Native, Flutter, Mobile Development', 'B.Tech/MCA in CS', 'Health insurance, Device allowance, App store credits', '2-4', 'Looking for a Mobile App Developer to build cross-platform mobile applications. Experience with both iOS and Android development is preferred.', 'Mobile App Developer', 600000, 1000000, 'Full-time', 'Indore', 'App bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'Show me your app portfolio.', 'Meena Deshpande', 'hr@edutech.com', '9876543217'),
(16, 8, 4, 6, 'HR Management, Recruitment, Employee Relations', 'MBA in HR or related', 'Health insurance, PF, Professional development', '1-3', 'Looking for an HR Manager to oversee HR operations and implement HR strategies. Experience with HRIS and performance management systems is a plus.', 'HR Manager', 500000, 800000, 'Full-time', 'Indore', 'Performance bonus', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 45 DAY), 'What HR initiatives have you led?', 'Meena Deshpande', 'hr@edutech.com', '9876543217');
