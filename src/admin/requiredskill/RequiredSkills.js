import { useStyles } from "./RequiredSkillsCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider,Button , TextField } from "@mui/material";
import {Select,InputLabel, FormControl, MenuItem} from "@mui/material"
import { useState, useEffect } from "react";
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function RequiredSkills(){
    const classes = useStyles();
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [categoryList,  setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [skills, setSkills]= useState('')
    const [formError,setformError] = useState({filename:''})

    const fetchAllCategory=async()=>
        {
          var response =await getData("requiredskills/display_all_category")
          setCategoryList(response.data)
        }
    
      useEffect(()=>{
        fetchAllCategory()
      },[])

    const fillCategoryMenu=()=>{
      return categoryList.map((item)=>{
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      })
    }

    const handleCategoryChange=(e)=>{
      setCategoryId(e.target.value)
      fetchAllSubCategory(e.target.value)
    }


    const fetchAllSubCategory=async(categoryid)=>
        {
          var response =await postData("requiredskills/display_all_subcategory",{categoryid})
          setSubCategoryList(response.data)
        }

    const fillSubCategoryMenu=()=>{
      return subCategoryList.map((item)=>{
        return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      })
    }

    const handleClick=async()=>{
        var error = validateData()
        if(error===false)
        {

        var body = {'categoryid':categoryId,'subcategoryid':subCategoryId,'skills':skills}

        var response = await postData('requiredskills/submit_skills',body)

        if(response.status){
           Swal.fire({
           icon: "success",
           text: response.message,
           toast: true
             });
           }
           else{
              Swal.fire({
                 icon: "error",
                 text: response.message,
                 toast: true
                      });
           }
        }
        clearData()
        }

    const clearData=()=>{
      setCategoryId(fillCategoryMenu())
      setSubCategoryId(fillSubCategoryMenu())
      setSkills('')
    }

    const handleError =(label,message)=>{
        setformError((prev)=>({...prev,[label]:message}))
      }

    const validateData=()=>{
      var error = false
      if(categoryId.length===0)
      {
         handleError('category', 'Category should not be blank...')
         error = true
      }

       if(subCategoryId.length===0)
      {
         handleError('subcategory', 'Sub Category should not be blank...')
         error = true
      }
      if(skills.length===0)
      {
        handleError('skills', 'Skill should not be blank...')
         error = true
      }
      return error
    }





    return (
        <div className={classes.root}>
            <div className={classes.box}>
            <Grid container spacing={2}>

                    <Grid size={12}>
                        <TitleComponent title="Skills Registration" />
                    </Grid>

                    <Grid size={12} style={{display:'flex' , justifyContent:'center'}}>
                      <Divider style={{width:'98%'}}/>
                    </Grid>

                    <Grid size={6}>
                      <FormControl fullWidth>
                       <InputLabel>Category</InputLabel>
                        <Select  error={formError.category} onFocus={()=>handleError('category',"")} value={categoryId}  label="Category" onChange={handleCategoryChange}>
                            {fillCategoryMenu()}
                        </Select>
                        <div className={classes.helperTextStyle}>{formError.category}</div>
                      </FormControl>
                    </Grid>

                    <Grid size={6}>
                      <FormControl fullWidth>
                       <InputLabel>Sub Category</InputLabel>
                        <Select  error={formError.subcategory} onFocus={()=>handleError('subcategory',"")} value={subCategoryId} label="Sub Category" onChange={(e)=>setSubCategoryId(e.target.value)}>
                        {fillSubCategoryMenu()}
                        </Select>
                        <div className={classes.helperTextStyle}>{formError.subcategory}</div>
                      </FormControl>
                    </Grid>

                    <Grid size={12}>
                      <TextField value={skills} label="Skills" helperText={formError.skills} error={formError.skills} onFocus={()=>handleError('skills',"")} onChange={(e)=>setSkills(e.target.value)} fullWidth />
                    </Grid>

                    <Grid size={6}>
                     <Button  fullWidth variant="contained" onClick={handleClick} >Submit</Button>
                  </Grid>

                  <Grid size={6}>
                      <Button fullWidth variant="contained" onClick={clearData}>Reset</Button>
                  </Grid>

            </Grid>
            </div>
        </div>
    )
}