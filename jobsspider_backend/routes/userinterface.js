var express = require('express');
var router = express.Router();
var pool = require('./pool');
router.get('/user_top_company_display', function (req, res, next) {
  try {
      pool.query("select C.*,(select S.statename from state S where S.stateid=C.stateid) as statename, (select CC.cityname from city CC where CC.cityid=C.cityid) as cityname from companies C limit 7",  function (error, result) {
          if (error) {
         
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

router.get('/trending_jobs', function (req, res, next) {
    try {
    pool.query("select company_jobs.jobtype,jobtype.picture, dense_rank() over(order by count(company_jobs.jobtype) desc) as trending from company_jobs,jobtype where company_jobs.jobtype=jobtype.jobtype  group by company_jobs.jobtype limit 5",
          function (error, result) {
            if (error) {
               
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

  router.post('/main_search_jobs', function (req, res, next) {
    try {
    console.log("xxxxxxxxxxxxxxx",req.body)
    var tq=''
    if(req.body.time==24)
    { tq=" and datediff(curdate(),postdate)<=1"}    
    else if(req.body.time==3)
        { tq=" and datediff(curdate(),postdate)<=3"}    
    else if(req.body.time==7)
        { tq=" and datediff(curdate(),postdate)<=7"}    
        
    var q=`SELECT C.*,CM.*,CT.*,SCT.*,(select cityname from city where cityid=CM.cityid) as cityname,(select statename from state where stateid=CM.stateid) as statename FROM company_jobs C,companies CM,category CT,subcategory SCT  where C.categoryid=${req.body.categoryid} and C.subcategoryid=${req.body.subcategoryid} and  C.companyid=CM.companyid and C.categoryid=CT.categoryid and C.subcategoryid=SCT.subcategoryid  and  ${req.body.expr}  between SUBSTRING_INDEX(C.experience, "-", 1)+0 and  substring(C.experience,locate('-', '1-6')+1)+0 ${tq}`
    console.log(q)

    pool.query(q,
          function (error, result) {
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
      console.log(e)
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }
  
  });

  router.get('/fetch_all_skills', function (req, res, next) {
    try {
    pool.query("select * from requiredskills"
    ,
          function (error, result) {
            if (error) {
          
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


  router.post('/check_account', function (req, res, next) {
    try {
        console.log("req:",req.body)
    pool.query("select * from users where emailaddress=? or mobileno=?",[req.body.emailMobile,req.body.emailMobile],
          function (error, result) {
            if (error) {
                console.log(error)
                res.status(200).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {
                if(result.length==1)
                res.status(200).json({ status: true, message: 'Success', data: result[0] })
                else
                res.status(200).json({ status: false, message: 'Success', data: [] })

            }
        })
    }
    catch (e) {
      
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }
  
  });

  router.post('/insert_record', function (req, res, next) {
    try {
    pool.query("insert into users values(?,?,?)",[req.body.mobileno,req.body.emailaddress,req.body.password],
          function (error, result) {
            if (error) {
 
                res.status(200).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {
              
                res.status(200).json({ status: true, message: 'Success', data: [] })
              
            }
        })
    }
    catch (e) {
      
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }
  
  });

router.post('/check_password', function (req, res, next) {
    try {
    pool.query("select * from users where (emailaddress=? or mobileno=?) and password=?",[req.body.emailMobile,req.body.emailMobile,req.body.password],
          function (error, result) {
            if (error) {
               
                res.status(500).json({ status: false, message: 'Database Error...pls Contact with DBA...' })
            }
            else {
                if(result.length==1)
                {     console.log(result[0])
                res.status(200).json({ status: true, message: 'Success', data: result[0] })
                
            }
                else
                res.status(200).json({ status: false, message: 'Success', data: [] })

            }
        })
    }
    catch (e) {
      
        res.status(200).json({ status: false, message: 'There is Technical issue...pls contact with server Admistrator... ' })
    }
  
  });


  module.exports = router;
