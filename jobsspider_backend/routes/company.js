var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool');
/* GET home page. */
router.post('/submit_company', upload.single('icon'), function (req, res, next) {
    console.log(req.body)
    try {
        pool.query("insert into companies (companyname, companyowner, companyaddress, stateid, cityid, emailid, mobileno, contactperson, aboutcompany, registrationno, pancard, password, verified, logo) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.companyname, req.body.companyowner, req.body.companyaddress, req.body.stateid, req.body.cityid, req.body.emailid, req.body.mobileno, req.body.contactperson, req.body.aboutcompany, req.body.registrationno, req.body.pancard, req.body.password, req.body.verified, req.file.filename], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Company information submitted Successfully' })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }

});


router.post('/update_company_verify', function (req, res, next) {
    console.log(req.body)
    try {
        pool.query("update companies  set verified=? where companyid=?", [req.body.verified, req.body.companyid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Company Verification Updated Successfully' })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }

});



router.get('/display_all', function (req, res, next) {
    try {
        pool.query("select C.*,(select S.statename from state S where S.stateid=C.stateid) as statename, (select CC.cityname from city CC where CC.cityid=C.cityid) as cityname from companies C",  function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Success', data: result })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }

});

router.post('/edit_company_data', upload.single('icon'), function (req, res, next) {
    try {
        pool.query("update companies set companyname=?, companyowner=?, companyaddress=?, stateid=?, cityid=?, emailid=?, mobileno=?, contactperson=?, aboutcompany=?, registrationno=?, pancard=?   where companyid=?", [req.body.companyname, req.body.companyowner, req.body.companyaddress, req.body.stateid, req.body.cityid, req.body.emailid, req.body.mobileno, req.body.contactperson, req.body.aboutcompany, req.body.registrationno, req.body.pancard, req.body.companyid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {

                res.status(200).json({ status: true, message: 'Category Name updated Successfully' })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }

});


router.post('/edit_company_picture', upload.single('icon'), function (req, res, next) {
    try {
        console.log("BODY:", req.body)
        pool.query("update companies set logo=? where companyid=?", [req.file.filename, req.body.companyid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error..Pls Contact DBA...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Picture Updated Successfully' })
            }

        })

    }
    catch (e) {
        console.log("Error:", e)
        res.status(200).json({ status: false, message: 'There is technical issue..Pls Contact Server Admistrator...' })
    }
});



router.post('/delete_company', upload.single('icon'), function (req, res, next) {
    try {
        pool.query(" delete from companies where companyid=?", [req.body.companyid], function (error, result) {
            if (error) {
                console.log(error)
                res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {
                res.status(200).json({ status: true, message: 'Category Deleted Successfully' })
            }
        })
    }
    catch (e) {
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }

});

module.exports = router;
