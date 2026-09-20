var express = require('express');
var router = express.Router(); 
var upload = require('./multer')
var pool = require('./pool');

router.get('/fetch_all_states', function(req, res, next) {
    pool.query('select * from state',function(error,result){
  
      if(error)
      {
        console.log("error")
        res.status(500).json({ status:false, message:'database error:pls contacr with database administartor'});
      }
  
      else
      {
        console.log("success")
        res.status(200).json({data:result,status:true, message:'success'});
      }
    
    });
  
  });

  

  router.post('/fetch_all_city', function(req, res, next) {
    pool.query('select * from city where stateid=?',[req.body.stateid],function(error,result){
  
      if(error)
      {
        console.log(error)
        res.status(500).json({ status:false, message:'database error:pls contacr with database administartor'});
      }
  
      else
      {
        console.log(req.body)
        res.status(200).json({data:result,status:true, message:'success'});
      }
    
    });
  
  });
module.exports = router;
