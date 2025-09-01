import { Button, Divider, TextField } from "@mui/material";
import {useStyles} from "./SubCategoryCss"
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useState,useEffect} from 'react'
import { postData } from "../../services/FetchNodeServices";
import Swal from 'sweetalert2'
import {Select,InputLabel,FormControl,MenuItem} from "@mui/material";
import { getData } from "../../services/FetchNodeServices"; 

export default function SubCategory()
{ const classes = useStyles();
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryName,setSubCategoryName]=useState('')
    const [icon,setIcon]=useState({byte:'',filename:'case.png'})
    const [formError,setFormError]=useState({filename:''})
    const [categoryList,setCategoryList]=useState([])
    const fetchAllCategory = async () => {
        var response = await getData("category/display_all");
        setCategoryList(response.data);
      };
      useEffect(() => {
        fetchAllCategory();
      }, []);
    const fillCategoryMenu=()=>{
    return  categoryList.map((item)=>{

            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleError=(label,message)=>{
        setFormError((prev)=>({...prev,[label]:message}))
    }
    const  clearData=()=>{
        setCategoryId("")
        setSubCategoryName("")
        setIcon({byte:'',filename:'case.png'})


    }
    const validateData=()=>{
     var error=false
      
     if(categoryId.length==0)
        {
           handleError('categoryId',"CategoryId should not be blank...")
            error=true 
       }

     if(subcategoryName.length==0)
     {
        handleError('subcategoryname',"SubCategoryname should not be blank...")
         error=true 
    }
    if(icon.byte.length==0)
      {
         handleError('filename',"please choose icon for subcategory...")
          error=true 
     }
    return error

    }
    const handleClick=async()=>{
       var error=validateData()
     if(error==false)
        {   

     var formData=new  FormData()   
     formData.append('categoryid',categoryId)
     formData.append('subcategoryname',subcategoryName)
     formData.append('icon',icon.byte)
      
     var response=await postData('subcategory/submit_SubCategory',formData)
     if(response.status)
     {
     Swal.fire({
        icon: "success",
        text: response.message,
        toast:true,
       
      });

      
    }
    else
    {
        Swal.fire({
            icon: "error",
            text: response.message,
            toast:true
          });
    }
}

clearData()
    }
    const handleIconChange=(e)=>{
        setIcon({byte:e.target.files[0],filename:URL.createObjectURL(e.target.files[0])})
         handleError("filename","")
    }
    return(<div className={classes.root}>
       <div className={classes.box}>
       <Grid container spacing={2}>
            <Grid size={12}>
               
                    <TitleComponent title="SubCategory Register"/>
               
            </Grid>
            <Grid  size={12} style={{display:'flex',justifyContent:'center'}}>
            <Divider  style={{width:'98%'}}/>
            </Grid>

            <Grid size={12}>
               <FormControl fullWidth>
                <InputLabel>CategoryId</InputLabel>
                <Select label="CategoryId" value={categoryId}
                 onChange={(e)=>setCategoryId(e.target.value)}
                >
             
                {fillCategoryMenu()}
                </Select>
               </FormControl>
            </Grid>

            
            <Grid size={12}>
                <TextField value={subcategoryName} helperText={formError.subcategoryname} error={formError.subcategoryname} onFocus={()=>handleError('subcategoryname','')} onChange={(e)=>setSubCategoryName(e.target.value)} label=" SubCategory Name" fullWidth/>
            </Grid>

            <Grid size={12} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
               
                <img src={icon.filename} style={{width:'20%'}}/>
                <div  className={classes.helperTextStyle}>
                  {formError.filename}
                </div>
            </Grid>

            <Grid size={12}>
            <Button fullWidth startIcon={<CloudUploadIcon />} component='label' variant="contained">
                    <input  onChange={handleIconChange} type="file" multiple  hidden accept="image/*"/>
                    Upload
                </Button>
            </Grid>

            <Grid size={6}>
        
             <Button fullWidth variant="contained" onClick={handleClick}>Save</Button> 
            </Grid> 

            <Grid size={6}>
             <Button  onClick={clearData} fullWidth variant="contained">Reset</Button> 
             </Grid>
            </Grid>
         

       </div>
    </div>)
}