var express = require('express');
var router = express.Router();
var pool=require("./pool")
/* GET home page. */
router.post('/check_password', function(req, res, next) {
    console.log(req.body)
  pool.query("select * from jobspider_admin where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){
   if(error)
   {console.log(error)  
    res.status(500).json({status:false,message:'Database Error..Pls Contact DBA...'})}
   else
   { if(result.length==1)
       res.status(200).json({status:true,data:result[0],message:'Success'})
     else
     res.status(200).json({status:false,data:[],message:'Invalid Emailid/Mobileno/Password....'})   
   }

  })
  
});

module.exports = router;

