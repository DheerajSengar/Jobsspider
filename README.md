# JobSpider — Full-Stack Job Portal

JobSpider is a full-stack job portal designed to connect **job seekers, companies, and administrators** through a centralized recruitment platform.

The application provides job discovery, advanced search and filtering, job applications, saved jobs, application tracking, company management, job verification, and an administrative dashboard.

It also supports **Google OAuth 2.0 authentication**, JWT-based authorization, MySQL database integration, and production deployment using **Render + Cloud MySQL**.

---

## Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [User Roles](#user-roles)
* [Tech Stack](#tech-stack)
* [Application Architecture](#application-architecture)
* [Project Structure](#project-structure)
* [Core Modules](#core-modules)
* [Authentication & Authorization](#authentication--authorization)
* [Database](#database)
* [Environment Variables](#environment-variables)
* [Local Development](#local-development)
* [Google Sign-In Setup](#google-sign-in-setup)
* [Cloud MySQL Setup](#cloud-mysql-setup)
* [Production Deployment](#production-deployment)
* [API Overview](#api-overview)
* [Security](#security)
* [Database Migration & Fixes](#database-migration--fixes)
* [Troubleshooting](#troubleshooting)
* [Development Guidelines](#development-guidelines)
* [Future Improvements](#future-improvements)
* [License](#license)

---

# Overview

JobSpider is built as a production-oriented recruitment platform with separate frontend and backend responsibilities.

### Job Seekers

Users can:

* Create an account
* Login using email/phone
* Sign in with Google
* Manage their profile
* Search for jobs
* Filter jobs using multiple criteria
* View detailed job information
* Apply for jobs
* Save/bookmark jobs
* Track application history
* Manage resume/profile information

### Companies & Administrators

Authorized users can:

* Manage companies
* Verify companies
* Create job postings
* Edit job postings
* Manage job categories
* Manage subcategories
* Manage required skills
* Monitor job postings
* Manage candidate applications
* Access protected administrative functionality

---

# Key Features

## Authentication

* Email/phone based authentication
* Google OAuth 2.0 Sign-In
* JWT-based authentication
* Password hashing using bcrypt
* Protected API routes
* Role-based authorization
* Token verification middleware

## Job Search

Users can search and filter jobs based on:

* Category
* Subcategory
* Experience
* Salary range
* Location
* Posted date
* Other available job attributes

## Job Applications

Users can:

* View job details
* Apply for jobs
* Track submitted applications
* View application status
* Manage application-related information

## Saved Jobs

Users can bookmark jobs and access them later from their saved jobs section.

Duplicate bookmarks are prevented using database-level constraints.

## Admin Dashboard

The administration system provides management functionality for:

* Companies
* Company verification
* Jobs
* Categories
* Subcategories
* Required skills
* Users
* Applications

## UI/UX

The frontend includes:

* Responsive React interface
* Material UI components
* Form validation
* Loading states
* Error handling
* Success/error notifications
* Dashboard-based workflows
* Responsive job listing and detail pages

---

# User Roles

## Job Seeker

Can:

* Register/login
* Manage profile
* Search jobs
* View jobs
* Save jobs
* Apply for jobs
* Track applications

## Administrator

Can:

* Manage users
* Manage companies
* Verify companies
* Manage categories
* Manage subcategories
* Manage skills
* Manage job postings
* Manage applications
* Access protected administrative APIs

Administrative APIs are protected using authorization middleware.

---

# Tech Stack

## Frontend

* React 18
* Material UI 6
* Redux
* React Router v6
* Axios
* SweetAlert2
* `@react-oauth/google`

## Backend

* Node.js
* Express.js 4
* MySQL2
* JWT
* bcryptjs
* Google Auth Library

## Database

* MySQL 8+
* Cloud MySQL compatible
* Aiven MySQL supported

## Deployment

* Render
* Cloud MySQL
* Express serving the production React build

---

# Application Architecture

JobSpider follows a frontend/backend separation with a unified production deployment model.

```text
                    ┌────────────────────┐
                    │      User          │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │   React Frontend   │
                    │  React Router      │
                    │  Redux             │
                    │  Material UI       │
                    └─────────┬──────────┘
                              │
                         HTTP / REST
                              │
                              ▼
                    ┌────────────────────┐
                    │  Express Backend   │
                    │                    │
                    │ Routes              │
                    │ Middleware         │
                    │ Controllers/Logic  │
                    │ Authentication     │
                    └─────────┬──────────┘
                              │
                         mysql2 Pool
                              │
                              ▼
                    ┌────────────────────┐
                    │     MySQL DB       │
                    │                    │
                    │ Users              │
                    │ Companies          │
                    │ Jobs               │
                    │ Applications       │
                    │ Saved Jobs         │
                    │ Categories         │
                    └────────────────────┘
```

### Production Architecture

```text
User
 │
 ▼
Render Web Service
 │
 ├── React Production Build
 │
 └── Express REST API
          │
          ▼
     Cloud MySQL
       (Aiven)
```

---

# Project Structure

```text
Jobsspider/
│
├── build/
│   └──                 # React production build
│
├── public/
│   └──                 # Public frontend assets
│
├── src/
│   ├── admin/
│   │   └──             # Admin dashboard
│   │
│   ├── userinterface/
│   │   └──             # Job seeker interface
│   │
│   ├── services/
│   │   └──             # API services and Redux-related logic
│   │
│   ├── App.js
│   └── index.js
│
├── jobsspider_backend/
│   │
│   ├── bin/
│   │   └── www         # Backend server entry point
│   │
│   ├── middleware/
│   │   └──             # Authentication/authorization middleware
│   │
│   ├── routes/
│   │   └──             # API routes
│   │
│   ├── schema.sql      # Database schema and seed data
│   ├── app.js          # Express configuration
│   └── pool.js         # MySQL connection pool/migrations
│
├── .env.example
├── package.json
└── README.md
```

---

# Core Modules

## User Management

Handles:

* Registration
* Login
* Google authentication
* User profiles
* Password handling
* Resume/profile information

## Job Management

Handles:

* Job creation
* Job updates
* Job deletion
* Job listing
* Job details
* Job filtering

## Application Management

Handles:

* Job applications
* Application status
* Application history
* Candidate information

## Saved Jobs

Handles:

* Save job
* Remove saved job
* Retrieve saved jobs
* Prevent duplicate saved jobs

## Company Management

Handles:

* Company registration
* Company information
* Verification
* Company job postings

## Admin Management

Handles:

* Administrative authentication
* Authorization
* CRUD operations
* Platform management

---

# Authentication & Authorization

JobSpider uses multiple authentication mechanisms.

## JWT Authentication

After successful authentication, the backend generates a JWT.

The token is used to access protected APIs.

```text
Login
  │
  ▼
Validate credentials
  │
  ▼
Generate JWT
  │
  ▼
Frontend stores authentication state
  │
  ▼
Authenticated API request
  │
  ▼
verifyToken middleware
  │
  ▼
Protected endpoint
```

## Password Security

Passwords are hashed using `bcryptjs`.

Plain-text passwords should never be stored in the database.

## Role-Based Authorization

Administrative endpoints use authorization middleware to ensure that only authorized users can perform administrative operations.

---

# Database

The application uses MySQL.

Main database entities include:

| Table              | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| `users`            | Job seeker profiles and authentication-related information |
| `companies`        | Company information and verification                       |
| `jobspider_admin`  | Administrator accounts                                     |
| `category`         | Job categories                                             |
| `subcategory`      | Job subcategories                                          |
| `requiredskills`   | Job skills                                                 |
| `company_jobs`     | Job postings                                               |
| `job_applications` | Candidate applications                                     |
| `saved_jobs`       | Bookmarked jobs                                            |

## Important Relationships

```text
users
 │
 ├──────────────► job_applications
 │
 └──────────────► saved_jobs

company_jobs
 │
 ├──────────────► job_applications
 │
 └──────────────► saved_jobs
```

Applications use:

```text
job_applications.userid
        ↓
users.userid
```

and:

```text
job_applications.jobid
        ↓
company_jobs.jobid
```

Saved jobs use the same user/job relationships.

---

# Environment Variables

Never commit real secrets to Git.

Create:

```text
.env
```

and configure the variables required by your environment.

Example:

```env
PORT=5000
NODE_ENV=development

# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=jobspider
DB_SSL=false

# Authentication
JWT_SECRET=your_secure_random_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend / Backend URLs
FRONTEND_URL=http://localhost:3000
REACT_APP_SERVER_URL=http://localhost:5000

# React Google Client ID
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### Important

Do not use real credentials in:

* README
* GitHub repository
* source code
* screenshots
* public configuration files

Use `.env.example` for documentation only.

---

# Local Development

## Prerequisites

Install:

* Node.js 18+
* npm
* MySQL 8+
* Git

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Jobsspider
```

---

## 2. Install Frontend Dependencies

From the project root:

```bash
npm install
```

---

## 3. Install Backend Dependencies

```bash
cd jobsspider_backend
npm install
cd ..
```

---

## 4. Configure MySQL

Create a MySQL database.

Example:

```sql
CREATE DATABASE jobspider;
```

Configure the database credentials in:

```text
jobsspider_backend/.env
```

---

## 5. Configure Environment Variables

Create the required `.env` files using `.env.example` as a reference.

Never commit the actual `.env` files.

---

## 6. Start Backend

```bash
cd jobsspider_backend
npm start
```

Backend:

```text
http://localhost:5000
```

---

## 7. Start Frontend

Open another terminal:

```bash
cd Jobsspider
npm start
```

Frontend:

```text
http://localhost:3000
```

---

# Google Sign-In Setup

JobSpider supports Google OAuth 2.0 authentication.

## Step 1 — Google Cloud Console

Open Google Cloud Console and create/select a project.

Navigate to:

```text
APIs & Services
        ↓
Credentials
        ↓
Create Credentials
        ↓
OAuth Client ID
```

Choose:

```text
Web Application
```

## Step 2 — Authorized JavaScript Origins

Add your development and production frontend URLs.

Example:

```text
http://localhost:3000
https://your-render-app.onrender.com
```

Use your actual deployed URL in production.

## Step 3 — OAuth Credentials

Configure the Google Client ID and Client Secret through environment variables.

```env
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
REACT_APP_GOOGLE_CLIENT_ID=...
```

Never hardcode these values.

## Step 4 — Production

After deploying to Render, update the Google OAuth configuration with the actual production domain/URLs required by the authentication flow.

---

# Cloud MySQL Setup

A local MySQL server cannot be accessed by a backend running on Render through `localhost`.

For production, use a cloud-accessible MySQL service.

Aiven MySQL can be used for this purpose.

## Aiven Configuration

Create a MySQL service and obtain:

* Host
* Port
* Username
* Password
* Database name
* SSL requirements

Configure them in Render environment variables.

Example:

```env
DB_HOST=your-aiven-host
DB_PORT=your-aiven-port
DB_USER=your-aiven-user
DB_PASSWORD=your-aiven-password
DB_NAME=your-database-name
DB_SSL=true
```

The actual values must come from your Aiven service.

---

# Production Deployment

JobSpider is designed to support a unified Render deployment where Express serves the React production build.

## Render Service

Create a new:

```text
Web Service
```

Connect your GitHub repository.

## Environment

```text
Node
```

## Build Command

```bash
npm install && npm run build
```

## Start Command

```bash
npm start
```

Use the project's actual npm scripts if they differ.

---

# Render Environment Variables

Configure the required production variables in:

```text
Render Dashboard
    ↓
Service
    ↓
Environment
```

Example:

```env
NODE_ENV=production

DB_HOST=your-cloud-mysql-host
DB_PORT=your-cloud-mysql-port
DB_USER=your-cloud-mysql-user
DB_PASSWORD=your-cloud-mysql-password
DB_NAME=your-cloud-mysql-database
DB_SSL=true

JWT_SECRET=your-production-secret

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

Do not copy development credentials into production.

---

# Database Initialization

The backend contains database initialization/migration logic.

The schema is defined in:

```text
jobsspider_backend/schema.sql
```

Database-related logic is handled through:

```text
jobsspider_backend/pool.js
```

The application should be tested against both:

* Fresh database
* Existing database

before production deployment.

---

# API Overview

The backend exposes REST APIs for major application functionality.

Typical API modules include:

```text
Authentication
Users
Jobs
Companies
Applications
Saved Jobs
Categories
Subcategories
Required Skills
Administration
```

API requests generally follow:

```text
Frontend
   ↓
Axios
   ↓
Express Route
   ↓
Authentication Middleware
   ↓
Authorization Middleware
   ↓
Database
   ↓
JSON Response
   ↓
React UI
```

Always verify the actual routes in:

```text
jobsspider_backend/routes/
```

before adding or modifying API documentation.

---

# Security

The application includes several security mechanisms.

## Password Hashing

Passwords are hashed using bcrypt.

## JWT Authentication

Protected APIs validate authentication tokens before processing requests.

## Admin Authorization

Administrative mutation endpoints are protected by authorization middleware.

## Environment Secrets

Sensitive credentials are stored using environment variables rather than source code.

## Database Security

Production databases should use:

* Strong passwords
* SSL/TLS where supported
* Restricted credentials
* Connection pooling
* Proper database permissions

## Input Validation

All user-controlled data should be validated before being processed or stored.

---

# Database Migration & Fixes

During development, an existing legacy database schema caused a foreign-key initialization error:

```text
Failed to add the foreign key constraint.
Missing column 'userid' for constraint
'job_applications_ibfk_2' in the referenced table 'users'
```

## Root Cause

The existing `users` table did not contain the `userid` column required by the application relationship.

The legacy schema used a composite primary key involving:

```text
mobileno
emailaddress
```

while the application expected a numeric user identifier.

## Updated Data Model

The application now expects:

```text
users
 └── userid INT PRIMARY KEY AUTO_INCREMENT
```

and:

```text
job_applications.userid
        ↓
users.userid
```

Similarly:

```text
saved_jobs.userid
        ↓
users.userid
```

## Applications Table

The expected structure includes:

```text
applicationid
jobid
userid
user_email
user_phone
resume_url
status
applied_at
```

## Saved Jobs Table

The expected structure includes:

```text
savedid
jobid
userid
saved_at
```

A unique constraint prevents the same user from saving the same job multiple times.

```text
UNIQUE(userid, jobid)
```

## Cascade Behavior

Foreign keys use cascade behavior where appropriate so that dependent application/bookmark records do not remain orphaned when a related record is removed.

---

# Troubleshooting

## MySQL Connection Error

Check:

```text
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
DB_NAME
DB_SSL
```

For local MySQL:

```env
DB_HOST=localhost
DB_PORT=3306
DB_SSL=false
```

For cloud MySQL:

```env
DB_HOST=your-cloud-host
DB_PORT=your-cloud-port
DB_SSL=true
```

---

## Foreign Key Error

If you see:

```text
Missing column 'userid'
```

check:

```sql
DESCRIBE users;
DESCRIBE job_applications;
```

Then verify:

```text
job_applications.userid
        ↓
users.userid
```

The two columns must have compatible data types.

Do not randomly add columns or drop tables without checking existing data and application code.

---

## CORS Error

Verify that the backend allows the correct frontend URL.

Development:

```text
http://localhost:3000
```

Production:

```text
https://your-production-domain
```

Do not use `*` for sensitive authenticated production APIs unless there is a specific reason and the security implications are understood.

---

## Google Login Not Working

Check:

1. Google Client ID
2. Google Client Secret
3. Authorized JavaScript origins
4. Authorized redirect URIs, where applicable
5. Frontend environment variables
6. Backend environment variables
7. Production domain
8. Google OAuth configuration

Also restart the application after changing environment variables.

---

## Render Deployment Fails

Check:

```text
Build Command
Start Command
Node Version
Environment Variables
Database Connection
CORS
Production API URL
Google OAuth URLs
```

Check Render logs for the first actual application error rather than only the final deployment message.

---

# Development Guidelines

When modifying JobSpider:

### 1. Understand Before Changing

Read the existing implementation before changing functionality.

### 2. Avoid Hardcoding

Do not hardcode:

* Database credentials
* JWT secrets
* Google credentials
* Production URLs

### 3. Preserve Existing Data

Database migrations should be designed carefully for existing installations.

### 4. Validate API Input

Never trust client-side validation alone.

### 5. Handle Errors Properly

Return meaningful HTTP status codes and safe error messages.

### 6. Keep Frontend and Backend Contracts Consistent

When changing an API response or request format, update all dependent frontend services/components.

### 7. Test Before Deployment

Verify:

```text
Frontend
Backend
Database
Authentication
Authorization
Major User Flows
Production Build
```

---

# Production Checklist

Before deploying JobSpider, verify:

* [ ] Frontend production build succeeds
* [ ] Backend starts successfully
* [ ] MySQL cloud database is reachable
* [ ] Database schema is initialized correctly
* [ ] Foreign keys work
* [ ] User registration works
* [ ] Login works
* [ ] Google Sign-In works
* [ ] JWT authentication works
* [ ] Admin authorization works
* [ ] Job listing works
* [ ] Job search works
* [ ] Job filtering works
* [ ] Job details work
* [ ] Job application works
* [ ] Saved jobs work
* [ ] Application history works
* [ ] Company management works
* [ ] Admin dashboard works
* [ ] CORS is correctly configured
* [ ] Production environment variables are configured
* [ ] `.env` is not committed
* [ ] No secrets are present in source code
* [ ] Render build succeeds
* [ ] Render service starts successfully
* [ ] Production API works
* [ ] Production frontend works
* [ ] README is updated

---

# Future Improvements

Potential improvements for future versions include:

* Real-time application notifications
* Email notifications
* Advanced candidate search
* Resume parsing
* AI-based job recommendations
* AI-powered resume analysis
* Job recommendation engine
* Company analytics
* Recruiter dashboard
* Advanced reporting
* Application status notifications
* Rate limiting
* Redis caching
* Background job processing
* Automated testing
* CI/CD pipeline
* API documentation using Swagger/OpenAPI
* Monitoring and logging
* Improved search using Elasticsearch/OpenSearch

---

# Project Status

JobSpider is designed as a full-stack production-oriented job portal with:

* React frontend
* Node.js/Express backend
* MySQL database
* JWT authentication
* Google OAuth 2.0
* Role-based authorization
* Job search and filtering
* Job applications
* Saved jobs
* Company management
* Admin dashboard
* Cloud MySQL compatibility
* Render deployment support

Before production release, all authentication, database migrations, API flows, environment configuration, and deployment settings should be tested against the actual production environment.

---

# License

Add your project's license here.

Example:

```text
MIT License
```

if the project is intended to be released under the MIT License.
