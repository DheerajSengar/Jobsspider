var express = require('express');
var router = express.Router();
var pool = require("./pool");
var bcrypt = require("bcryptjs");
var { generateToken } = require("../middleware/authMiddleware");

router.post('/check_password', function(req, res, next) {
  const { emailid, password } = req.body;
  if (!emailid || !password) {
    return res.status(400).json({ status: false, message: 'Email/Mobile and password are required' });
  }

  pool.query(
    "SELECT * FROM jobspider_admin WHERE emailid=? OR mobileno=?",
    [emailid, emailid],
    async function(error, result) {
      if (error) {
        console.error(error);
        return res.status(500).json({ status: false, message: 'Database Error. Please contact DBA.' });
      }

      if (result.length === 0) {
        return res.status(200).json({ status: false, data: [], message: 'Invalid Email ID / Mobile / Password' });
      }

      const admin = result[0];
      let isMatch = false;

      if (admin.password.startsWith('$2a$') || admin.password.startsWith('$2b$')) {
        isMatch = await bcrypt.compare(password, admin.password);
      } else {
        isMatch = (admin.password === password);
      }

      if (isMatch) {
        const token = generateToken({ adminid: admin.adminid, emailid: admin.emailid, role: 'admin' });
        delete admin.password;
        return res.status(200).json({
          status: true,
          data: admin,
          token: token,
          message: 'Success'
        });
      } else {
        return res.status(200).json({ status: false, data: [], message: 'Invalid Email ID / Mobile / Password' });
      }
    }
  );
});

module.exports = router;


