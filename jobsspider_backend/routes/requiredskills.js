var express = require('express');
var router = express.Router();
var upload = require('./multer')
var pool = require('./pool')

router.get("/display_all_category",function(req,res,next){
    try
    {
      pool.query("select * from category",function(error,result){
        if(error)
        {
          console.log(error)
          res.status(500).json({status:false, message:'Database Error Pls Contact DBA...'})
        }
        else
        {
          res.status(200).json({status:true, message:'Success',data:result})
        }
      })
    }
    catch(e)
    {
      console.log(e)
      res.status(404).json({status:false, message:'There is technical issue..pls Contact Server Administrator'})
    }
  })

router.post("/display_all_subcategory",function(req,res,next){
  try
  {
    pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
      if(error)
      {
        console.log(error)
        res.status(500).json({status:false, message:'Database Error Pls Contact DBA...'})
      }
      else
      {
        res.status(200).json({status:true, message:'Success',data:result})
      }
    })
  }
  catch(e)
  {
    console.log(e)
    res.status(404).json({status:false, message:'There is technical issue..pls Contact Server Administrator'})
  }
})


router.post('/submit_skills',function (req,res,next) {
    try
    {
      pool.query('INSERT INTO requiredskills ( categoryid, subcategoryid, skills ) VALUES (?,?,?)',[req.body.categoryid , req.body.subcategoryid , req.body.skills],function(error,result){
        if(error)
        {
          console.log(error)
          res.status(500).json({status:false, message:'Database Error Pls Contact DBA...'})
        }
        else
        {
          res.status(200).json({status:true, message:'Skill Submitted Successfully'})
        }
      })
    }
    catch(e)
    {
      console.log(e)
      res.status(404).json({status:false, message:'There is technical issue..pls Contact Server Administrator'})
    }
  })

  router.get("/display_all_requiredskills",function(req,res,next){
    try
    {
      pool.query("select R.* ,(select C.categoryname from category C where C.categoryid = R.categoryid )as categoryname ,(select S.subcategoryname from subcategory S where S.subcategoryid = R.subcategoryid )as subcategoryname from requiredskills R",function(error,result){
        if(error)
        {
          console.log(error)
          res.status(500).json({status:false, message:'Database Error Pls Contact DBA...'})
        }
        else
        {
          res.status(200).json({status:true, message:'Success',data:result})
        }
      })
    }
    catch(e)
    {
      console.log(e)
      res.status(404).json({status:false, message:'There is technical issue..pls Contact Server Administrator'})
    }
  })

  router.post("/delete_requiredskills",function (req,res,next) {
    try{
      pool.query('delete from requiredskills where skillid=?',[req.body.skillsid],function(error,result){
          if(error){
            console.log(error)
              res.status(500).json({status:false, message:'Database Error Pls Contact DBA...'})
          }
          else {
              res.status(200).json({status:true, message:'RequiredSkills Deleted Successfully'})
          }
      })
    }
    catch(e){
      console.log(e)
      res.status(404).json({status:false, message:'There is technical issue..pls Contact Server Administrator'})
    }
  })

  router.post("/edit_requiredskills_data",function (req,res,next) {
    try{
      console.log(req.body.subcategoryid)
      pool.query("update requiredskills set categoryid=?, subcategoryid=?, skills=?  where skillid=?",[req.body.categoryid,req.body.subcategoryid,req.body.skills,req.body.skillsid],function(error,result){
          if(error){
            console.log(error)
              res.status(500).json({status:false, message:'Database Error Pls Contact DBA...'})
          }
          else {
              console.log(result)
              res.status(200).json({status:true, message:'RequiredSkill  Updated Successfully'})
          }
      })
    }
    catch(e){
      console.log(e)
      res.status(404).json({status:false, message:'There is technical issue..pls Contact Server Administrator'})
    }
  })

  module.exports = router;
  