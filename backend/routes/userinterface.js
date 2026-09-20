var express = require('express');
var router = express.Router();
var pool = require('./pool');
var bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const { generateToken, verifyToken } = require('../middleware/authMiddleware');

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID || '',
  process.env.GOOGLE_CLIENT_SECRET || ''
);

// Fetch top companies for homepage
router.get('/user_top_company_display', function (req, res) {
  try {
    pool.query(
      "SELECT C.*, (SELECT S.statename FROM state S WHERE S.stateid=C.stateid) AS statename, (SELECT CC.cityname FROM city CC WHERE CC.cityid=C.cityid) AS cityname FROM companies C LIMIT 10",
      function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: false, message: 'Database Error... Please contact DBA.' });
        }
        res.status(200).json({ status: true, message: 'Success', data: result });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Server error processing top companies request.' });
  }
});

// Fetch trending jobs for homepage
router.get('/trending_jobs', function (req, res) {
  try {
    pool.query(
      "SELECT company_jobs.jobtype, jobtype.picture, COUNT(company_jobs.jobtype) as total_jobs FROM company_jobs LEFT JOIN jobtype ON company_jobs.jobtype=jobtype.jobtype GROUP BY company_jobs.jobtype ORDER BY total_jobs DESC LIMIT 5",
      function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: false, message: 'Database Error... Please contact DBA.' });
        }
        res.status(200).json({ status: true, message: 'Success', data: result });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Server error processing trending jobs.' });
  }
});

// Main search jobs with secure parameterized query
router.post('/main_search_jobs', function (req, res) {
  try {
    const { categoryid, subcategoryid, expr, time, cityid, keyword } = req.body;
    let queryConditions = [];
    let queryParams = [];

    let q = `SELECT C.*, CM.companyname, CM.logo as companylogo, CM.aboutcompany,
             CT.categoryname, SCT.subcategoryname,
             (SELECT cityname FROM city WHERE cityid=CM.cityid) as cityname,
             (SELECT statename FROM state WHERE stateid=CM.stateid) as statename
             FROM company_jobs C
             INNER JOIN companies CM ON C.companyid = CM.companyid
             INNER JOIN category CT ON C.categoryid = CT.categoryid
             INNER JOIN subcategory SCT ON C.subcategoryid = SCT.subcategoryid
             WHERE 1=1`;

    if (categoryid && parseInt(categoryid, 10) > 0) {
      queryConditions.push("C.categoryid = ?");
      queryParams.push(parseInt(categoryid, 10));
    }

    if (subcategoryid && parseInt(subcategoryid, 10) > 0) {
      queryConditions.push("C.subcategoryid = ?");
      queryParams.push(parseInt(subcategoryid, 10));
    }

    if (expr !== undefined && expr !== null && expr !== '') {
      const expVal = parseFloat(expr) || 0;
      queryConditions.push("? BETWEEN CAST(SUBSTRING_INDEX(C.experience, '-', 1) AS SIGNED) AND CAST(SUBSTRING_INDEX(C.experience, '-', -1) AS SIGNED)");
      queryParams.push(expVal);
    }

    if (time) {
      const timeVal = parseInt(time, 10);
      if (timeVal > 0) {
        queryConditions.push("DATEDIFF(CURDATE(), C.postdate) <= ?");
        queryParams.push(timeVal);
      }
    }

    if (keyword && keyword.trim() !== '') {
      queryConditions.push("(C.jobtype LIKE ? OR C.jobdeatails LIKE ? OR CT.categoryname LIKE ? OR SCT.subcategoryname LIKE ? OR C.skills LIKE ?)");
      const term = `%${keyword.trim()}%`;
      queryParams.push(term, term, term, term, term);
    }

    if (queryConditions.length > 0) {
      q += " AND " + queryConditions.join(" AND ");
    }

    q += " ORDER BY C.jobid DESC";

    pool.query(q, queryParams, function (error, result) {
      if (error) {
        console.error("SQL Error in main_search_jobs:", error);
        return res.status(500).json({ status: false, message: 'Database Error... Please contact DBA.' });
      }
      res.status(200).json({ status: true, message: 'Success', data: result });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false, message: 'Server error searching jobs.' });
  }
});

// Fetch all skills
router.get('/fetch_all_skills', function (req, res) {
  const fallbackSkills = [
    { skillid: 1, categoryid: 1, subcategoryid: 1, skills: "Information Technology (IT) - Full Stack Developer" },
    { skillid: 2, categoryid: 1, subcategoryid: 1, skills: "Frontend Developer (React.js / Next.js)" },
    { skillid: 3, categoryid: 1, subcategoryid: 1, skills: "Backend Developer (Node.js / Java / Python)" },
    { skillid: 4, categoryid: 1, subcategoryid: 2, skills: "Data Science & Data Analyst" },
    { skillid: 5, categoryid: 2, subcategoryid: 3, skills: "Sales & Marketing - Digital Marketing" },
    { skillid: 6, categoryid: 2, subcategoryid: 4, skills: "Business Development & Sales Executive" },
    { skillid: 7, categoryid: 3, subcategoryid: 5, skills: "Finance & Accounting - GST / Tally" },
    { skillid: 8, categoryid: 4, subcategoryid: 6, skills: "Human Resources (HR) & Talent Acquisition" },
    { skillid: 9, categoryid: 5, subcategoryid: 7, skills: "Design & Creative - UI/UX Designer" },
    { skillid: 10, categoryid: 1, subcategoryid: 1, skills: "MERN Stack Developer" }
  ];

  try {
    pool.query("SELECT * FROM requiredskills", function (error, result) {
      if (error || !result || result.length === 0) {
        return res.status(200).json({ status: true, message: 'Success', data: fallbackSkills });
      }
      res.status(200).json({ status: true, message: 'Success', data: result });
    });
  } catch (e) {
    res.status(200).json({ status: true, message: 'Fallback', data: fallbackSkills });
  }
});

// Check if user account exists
router.post('/check_account', function (req, res) {
  try {
    const { emailMobile } = req.body;
    if (!emailMobile) {
      return res.status(400).json({ status: false, message: 'Email or Mobile required' });
    }

    pool.query(
      "SELECT userid, mobileno, emailaddress, username, picture, google_id, headline, skills FROM users WHERE emailaddress=? OR mobileno=?",
      [emailMobile, emailMobile],
      function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: false, message: 'Database error checking account' });
        }
        if (result.length === 1) {
          res.status(200).json({ status: true, message: 'Success', data: result[0] });
        } else {
          res.status(200).json({ status: false, message: 'Account not found', data: [] });
        }
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
});

// Register user (insert record with hashed password)
router.post('/insert_record', async function (req, res) {
  try {
    const { mobileno, emailaddress, password, username } = req.body;
    if (!emailaddress || !mobileno) {
      return res.status(400).json({ status: false, message: 'Mobile and Email are required' });
    }

    let hashedPassword = '';
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Check if user already exists
    pool.query(
      "SELECT userid FROM users WHERE emailaddress=? OR mobileno=?",
      [emailaddress, mobileno],
      function (checkErr, checkRes) {
        if (checkErr) {
          return res.status(500).json({ status: false, message: 'Database error checking user.' });
        }
        if (checkRes.length > 0) {
          return res.status(400).json({ status: false, message: 'User with this Email or Mobile already exists.' });
        }

        pool.query(
          "INSERT INTO users (mobileno, emailaddress, password, username) VALUES (?, ?, ?, ?)",
          [mobileno, emailaddress, hashedPassword, username || emailaddress.split('@')[0]],
          function (error, result) {
            if (error) {
              console.error(error);
              return res.status(500).json({ status: false, message: 'Database error creating account.' });
            }
            const userId = result.insertId;
            const token = generateToken({ userid: userId, emailaddress, role: 'user' });
            res.status(200).json({
              status: true,
              message: 'Success',
              token,
              data: { userid: userId, mobileno, emailaddress, username: username || emailaddress.split('@')[0] }
            });
          }
        );
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false, message: 'Server error creating account' });
  }
});

// User login password verification
router.post('/check_password', function (req, res) {
  try {
    const { emailMobile, password } = req.body;
    if (!emailMobile || !password) {
      return res.status(400).json({ status: false, message: 'Credentials missing' });
    }

    pool.query(
      "SELECT * FROM users WHERE emailaddress=? OR mobileno=?",
      [emailMobile, emailMobile],
      async function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: false, message: 'Database error' });
        }

        if (result.length === 1) {
          const user = result[0];
          let isMatch = false;

          if (user.password && (user.password.startsWith('$2a$') || user.password.startsWith('$2b$'))) {
            isMatch = await bcrypt.compare(password, user.password);
          } else {
            isMatch = (user.password === password);
          }

          if (isMatch) {
            delete user.password;
            const token = generateToken({ userid: user.userid, emailaddress: user.emailaddress, role: 'user' });
            return res.status(200).json({ status: true, message: 'Success', data: user, token });
          }
        }
        res.status(200).json({ status: false, message: 'Invalid credentials', data: [] });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Server error verifying password' });
  }
});

// Google OAuth Login / Registration Endpoint
router.post('/google_login', async function (req, res) {
  try {
    const { token, credential, userInfo } = req.body;
    let googleId = '';
    let email = '';
    let name = '';
    let picture = '';

    // If credential (id_token) is passed from Google Sign-In button
    if (credential) {
      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: credential,
          audience: process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        googleId = payload.sub;
        email = payload.email;
        name = payload.name;
        picture = payload.picture;
      } catch (verifyErr) {
        console.warn("Google Token Verification Warn:", verifyErr.message);
        // Fallback if client ID verification fails or token comes directly from OAuth user object
        if (userInfo) {
          googleId = userInfo.sub || userInfo.id;
          email = userInfo.email;
          name = userInfo.name;
          picture = userInfo.picture;
        } else {
          return res.status(401).json({ status: false, message: 'Invalid Google credential token.' });
        }
      }
    } else if (userInfo) {
      googleId = userInfo.sub || userInfo.id;
      email = userInfo.email;
      name = userInfo.name;
      picture = userInfo.picture;
    }

    if (!email) {
      return res.status(400).json({ status: false, message: 'Google authentication failed: Email missing.' });
    }

    // Check if user exists by email or google_id
    pool.query(
      "SELECT * FROM users WHERE emailaddress=? OR google_id=?",
      [email, googleId],
      function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: false, message: 'Database error during Google login.' });
        }

        if (result.length > 0) {
          const existingUser = result[0];
          // Update google_id and picture if missing
          pool.query(
            "UPDATE users SET google_id=?, picture=COALESCE(picture, ?) WHERE userid=?",
            [googleId, picture, existingUser.userid]
          );
          delete existingUser.password;
          const jwtToken = generateToken({ userid: existingUser.userid, emailaddress: existingUser.emailaddress, role: 'user' });
          return res.status(200).json({ status: true, message: 'Success', data: existingUser, token: jwtToken });
        } else {
          // Create new user account
          const dummyMobile = 'G-' + Date.now().toString().slice(-8);
          pool.query(
            "INSERT INTO users (mobileno, emailaddress, username, picture, google_id) VALUES (?, ?, ?, ?, ?)",
            [dummyMobile, email, name || email.split('@')[0], picture, googleId],
            function (insertErr, insertRes) {
              if (insertErr) {
                console.error(insertErr);
                return res.status(500).json({ status: false, message: 'Failed to create user account from Google Login.' });
              }
              const newUser = {
                userid: insertRes.insertId,
                emailaddress: email,
                mobileno: dummyMobile,
                username: name || email.split('@')[0],
                picture
              };
              const jwtToken = generateToken({ userid: newUser.userid, emailaddress: newUser.emailaddress, role: 'user' });
              return res.status(200).json({ status: true, message: 'Success', data: newUser, token: jwtToken });
            }
          );
        }
      }
    );
  } catch (e) {
    console.error("Google Auth Exception:", e);
    res.status(500).json({ status: false, message: 'Server error processing Google Login' });
  }
});

// Job Application Endpoint
router.post('/apply_job', verifyToken, function (req, res) {
  try {
    const userId = req.user.userid;
    const { jobid, user_email, user_phone, resume_url } = req.body;

    if (!jobid) {
      return res.status(400).json({ status: false, message: 'Job ID is required' });
    }

    pool.query(
      "SELECT applicationid FROM job_applications WHERE jobid=? AND userid=?",
      [jobid, userId],
      function (checkErr, checkRes) {
        if (checkErr) {
          return res.status(500).json({ status: false, message: 'Database error checking application status.' });
        }
        if (checkRes.length > 0) {
          return res.status(400).json({ status: false, message: 'You have already applied for this job!' });
        }

        pool.query(
          "INSERT INTO job_applications (jobid, userid, user_email, user_phone, resume_url) VALUES (?, ?, ?, ?, ?)",
          [jobid, userId, user_email || req.user.emailaddress, user_phone || '', resume_url || ''],
          function (error, result) {
            if (error) {
              console.error(error);
              return res.status(500).json({ status: false, message: 'Failed to submit application.' });
            }
            res.status(200).json({ status: true, message: 'Job application submitted successfully!' });
          }
        );
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Server error processing job application.' });
  }
});

// User Applications Endpoint
router.get('/user_applications', verifyToken, function (req, res) {
  try {
    const userId = req.user.userid;
    const sql = `SELECT A.*, C.jobtype, C.experience, C.minsalary, C.maxsalary, C.worklocationcity,
                 CM.companyname, CM.logo as companylogo
                 FROM job_applications A
                 INNER JOIN company_jobs C ON A.jobid = C.jobid
                 INNER JOIN companies CM ON C.companyid = CM.companyid
                 WHERE A.userid = ?
                 ORDER BY A.applied_at DESC`;

    pool.query(sql, [userId], function (error, result) {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Database error fetching applications.' });
      }
      res.status(200).json({ status: true, message: 'Success', data: result });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Server error fetching user applications.' });
  }
});

// Save Job Endpoint
router.post('/save_job', verifyToken, function (req, res) {
  try {
    const userId = req.user.userid;
    const { jobid } = req.body;

    if (!jobid) {
      return res.status(400).json({ status: false, message: 'Job ID required' });
    }

    pool.query(
      "INSERT IGNORE INTO saved_jobs (jobid, userid) VALUES (?, ?)",
      [jobid, userId],
      function (error, result) {
        if (error) {
          console.error(error);
          return res.status(500).json({ status: false, message: 'Database error saving job.' });
        }
        res.status(200).json({ status: true, message: 'Job bookmarked successfully.' });
      }
    );
  } catch (e) {
    res.status(500).json({ status: false, message: 'Server error saving job.' });
  }
});

// Fetch Saved Jobs Endpoint
router.get('/fetch_saved_jobs', verifyToken, function (req, res) {
  try {
    const userId = req.user.userid;
    const sql = `SELECT S.savedid, S.saved_at, C.*, CM.companyname, CM.logo as companylogo, CT.categoryname
                 FROM saved_jobs S
                 INNER JOIN company_jobs C ON S.jobid = C.jobid
                 INNER JOIN companies CM ON C.companyid = CM.companyid
                 INNER JOIN category CT ON C.categoryid = CT.categoryid
                 WHERE S.userid = ?
                 ORDER BY S.saved_at DESC`;

    pool.query(sql, [userId], function (error, result) {
      if (error) {
        return res.status(500).json({ status: false, message: 'Database error fetching saved jobs.' });
      }
      res.status(200).json({ status: true, message: 'Success', data: result });
    });
  } catch (e) {
    res.status(500).json({ status: false, message: 'Server error fetching saved jobs.' });
  }
});

// Fetch single job details by jobid
router.get('/job_details/:jobid', function (req, res) {
  try {
    const jobid = parseInt(req.params.jobid, 10);
    if (!jobid || isNaN(jobid)) {
      return res.status(400).json({ status: false, message: 'Valid Job ID is required' });
    }

    const sql = `SELECT C.*, CM.companyname, CM.logo as companylogo, CM.aboutcompany, CM.companyaddress,
                 CM.companyowner, CM.emailid as company_email, CM.mobileno as company_mobile,
                 CM.contactperson as company_contactperson, CM.registrationno,
                 CT.categoryname, SCT.subcategoryname,
                 (SELECT cityname FROM city WHERE cityid=CM.cityid) as cityname,
                 (SELECT statename FROM state WHERE stateid=CM.stateid) as statename
                 FROM company_jobs C
                 INNER JOIN companies CM ON C.companyid = CM.companyid
                 INNER JOIN category CT ON C.categoryid = CT.categoryid
                 INNER JOIN subcategory SCT ON C.subcategoryid = SCT.subcategoryid
                 WHERE C.jobid = ?`;

    pool.query(sql, [jobid], function (error, result) {
      if (error) {
        console.error("SQL Error in job_details:", error);
        return res.status(500).json({ status: false, message: 'Database Error fetching job details.' });
      }
      if (result.length === 0) {
        return res.status(404).json({ status: false, message: 'Job not found.' });
      }
      res.status(200).json({ status: true, message: 'Success', data: result[0] });
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false, message: 'Server error fetching job details.' });
  }
});

// Fetch related/similar jobs
router.get('/related_jobs/:jobid', function (req, res) {
  try {
    const jobid = parseInt(req.params.jobid, 10);
    if (!jobid || isNaN(jobid)) {
      return res.status(400).json({ status: false, message: 'Valid Job ID required' });
    }

    // First get the category of the current job, then find similar jobs
    pool.query("SELECT categoryid, subcategoryid, companyid FROM company_jobs WHERE jobid=?", [jobid], function (err, jobRes) {
      if (err || jobRes.length === 0) {
        return res.status(200).json({ status: true, data: [] });
      }

      const { categoryid, subcategoryid, companyid } = jobRes[0];
      const sql = `SELECT C.jobid, C.jobtype, C.minsalary, C.maxsalary, C.experience, C.schedule, C.worklocationcity, C.postdate,
                   CM.companyname, CM.logo as companylogo, CT.categoryname, SCT.subcategoryname
                   FROM company_jobs C
                   INNER JOIN companies CM ON C.companyid = CM.companyid
                   INNER JOIN category CT ON C.categoryid = CT.categoryid
                   INNER JOIN subcategory SCT ON C.subcategoryid = SCT.subcategoryid
                   WHERE C.jobid != ? AND (C.categoryid = ? OR C.subcategoryid = ? OR C.companyid = ?)
                   ORDER BY C.jobid DESC LIMIT 6`;

      pool.query(sql, [jobid, categoryid, subcategoryid, companyid], function (error, result) {
        if (error) {
          return res.status(200).json({ status: true, data: [] });
        }
        res.status(200).json({ status: true, message: 'Success', data: result });
      });
    });
  } catch (e) {
    res.status(200).json({ status: true, data: [] });
  }
});

module.exports = router;
