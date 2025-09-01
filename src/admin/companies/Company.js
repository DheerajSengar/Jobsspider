
import Radio from '@mui/material/Radio';
import TitleComponent from '../components/TitleComponent';
import {useStyles} from "./CompanyCss"
import { Button, Divider, TextField } from "@mui/material";
// import TitleComponent from "../src/admin/components/TitleComponent"
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useState,useEffect} from 'react'
import {getData, postData,passwordGenerator } from "../../services/FetchNodeServices";
import Swal from 'sweetalert2'
import {Select,InputLabel,FormControl,MenuItem} from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
 
 
export default function Company()
{ const classes = useStyles();
 
    const [companyName,setCompanyName]=useState('')
    const [companyOwner,setCompanyOwner]=useState('')
    const [companyAddress,setCompanyAddress]=useState('')
    const [stateId,setStateId]=useState('')
    
    const [cityId,setCityId]=useState('')
    const [emailId,setEmailId]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [contactPerson,setContactPerson]=useState('')
    const [aboutCompany,setAboutCompany]=useState('')
    const [registrationNo,setRegistrationNo]=useState('')
    const [panCard,setPanCard]=useState('')
    const [password,setPassword]=useState('')
    const [verified,setVerified]=useState('')
    const [stateList,setStateList]=useState([])
    const [cityList,setCityList]=useState([])
    const fetchAllState = async () => {
     
            const response = await getData("statecity/fetch_all_states");
         
          
                setStateList(response.data);
            
    };

    useEffect(() => {
        fetchAllState();
    }, []);

    const fillStateMenu = () => {
        return stateList.map((item) => (
            <MenuItem key={item.stateid} value={item.stateid}>
                {item.statename} 
            </MenuItem>
        ));
    };



    const fetchAllCity = async (stateid) => {

            const response = await postData("statecity/fetch_all_city",{stateid});
                setCityList(response.data);

    };

    
    const fillCityMenu = () => {
        return cityList.map((item) => (
            <MenuItem key={item.cityid} value={item.cityid}>
                {item.cityname} 
            </MenuItem>
        ));
    };
  
    const handleStateChange=(e)=>{
        setStateId(e.target.value)
        fetchAllCity(e.target.value)
    }

    const [icon,setIcon]=useState({byte:'',filename:'case.png'})
    const [formError,setFormError]=useState({filename:''})
    const handleError=(label,message)=>{
        setFormError((prev)=>({...prev,[label]:message}))
    }
    const clearData=()=>{
        setCompanyName("")
        setCompanyOwner("")
        setCompanyAddress("")
        setStateId("")
        setCityId("")
        setEmailId("")
        setMobileNo("")
        setContactPerson("")
        setAboutCompany("")
        setRegistrationNo("")
        setPanCard("")
        setPassword("")
        setVerified("")
        setIcon({byte:'',filename:'case.png'})
    }
    const validateData=()=>{
     var error=false
     if(companyName.length==0)
     {
        handleError('companyname',"Companyyname should not be blank...")
         error=true 
    }
    if(companyOwner.length==0)
        {
           handleError('companyowner',"Companyowner should not be blank...")
            error=true 
       }
       if(companyAddress.length==0)
        {
           handleError('companyaddress',"Companyaddress should not be blank...")
            error=true 
       }
       if(stateId.length==0)
        {
           handleError('stateid',"stateid should not be blank...")
            error=true 
       }
       if(cityId.length==0)
        {
           handleError('cityid',"cityid should not be blank...")
            error=true 
       }
       if(emailId.length==0)
        {
           handleError('emailid',"emailid should not be blank...")
            error=true 
       }

       if(mobileNo.length==0)
        {
           handleError('mobileno',"mobileno should not be blank...")
            error=true 
       }
       if(contactPerson.length==0)
        {
           handleError('contactperson',"contactperson should not be blank...")
            error=true 
       }
       
       if(registrationNo.length==0)
        {
           handleError('registrationno',"registrationno should not be blank...")
            error=true 
       }
       if(panCard.length==0)
        {
           handleError('panCard',"pancard should not be blank...")
            error=true 
       }
       
       
    if(icon.byte.length==0)
        {
           handleError('filename',"Please choose icon for category....")
            error=true 
       }
       
   
    return error

    }
    const handleClick=async()=>{
       var error=validateData()
     if(error==false)
        {   

     var formData=new  FormData()   
     formData.append('companyname',companyName)
     formData.append('companyowner',companyOwner)
     formData.append('companyaddress',companyAddress)
     formData.append('stateid',stateId)
     formData.append('cityid',cityId)
     formData.append('emailid',emailId)
     formData.append('mobileno',mobileNo)
     formData.append('contactperson',contactPerson)
     formData.append('aboutcompany',aboutCompany)
     formData.append('registrationno',registrationNo)
     formData.append('pancard',panCard)
     var p=passwordGenerator()
      
     formData.append('password',p)
     formData.append('verified',0)
     
     formData.append('icon',icon.byte)
      
     var response=await postData('company/submit_company',formData)
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
               
                    <TitleComponent title="Company Register"/>
               
            </Grid>
            <Grid  size={12} style={{display:'flex',justifyContent:'center'}}>
            <Divider  style={{width:'98%'}}/>
            </Grid>
            <Grid size={6}>
                <TextField value={companyName} helperText={formError.companyname} error={formError.companyname} onFocus={()=>handleError('companyname','')} onChange={(e)=>setCompanyName(e.target.value)} label="Company Name" fullWidth/>
            </Grid>
            <Grid size={6}>
                <TextField value={companyOwner} helperText={formError.companyowner} error={formError.compantowner} onFocus={()=>handleError('companyowner','')} onChange={(e)=>setCompanyOwner(e.target.value)} label="Company owner" fullWidth/>
            </Grid>
            <Grid size={12}>
                <TextField value={companyAddress} helperText={formError.companyaddress} error={formError.compantaddress} onFocus={()=>handleError('companyaddress','')} onChange={(e)=>setCompanyAddress(e.target.value)} label="Company address" fullWidth/>
            </Grid>
            <Grid size={6}>
               <FormControl fullWidth>
                <InputLabel>State Id</InputLabel>
                <Select label="StateId" value={stateId}
                onChange={handleStateChange}>
                    
                    {fillStateMenu()}
                </Select>
               </FormControl>
             </Grid>
            <Grid size={6}>
            <FormControl fullWidth>
                <InputLabel>City Id</InputLabel>
                <Select label="CityId" value={cityId}
                onChange={(e)=>setCityId(e.target.value)}>
                    
                    {fillCityMenu()}
                </Select>
               </FormControl>
            </Grid>
            <Grid size={4}>
                <TextField value={emailId} helperText={formError.emailid} error={formError.emailid} onFocus={()=>handleError('emailid','')} onChange={(e)=>setEmailId(e.target.value)} label="Email Id" fullWidth/>
            </Grid>
            <Grid size={4}>
                <TextField value={mobileNo} helperText={formError.mobileno} error={formError.mobileno} onFocus={()=>handleError('mobileno','')} onChange={(e)=>setMobileNo(e.target.value)} label="Mobile No" fullWidth/>
            </Grid>
            <Grid size={4}>
                <TextField value={contactPerson} helperText={formError.contactperson} error={formError.contactperson} onFocus={()=>handleError('contactperson','')} onChange={(e)=>setContactPerson(e.target.value)} label="Contact Person" fullWidth/>
            </Grid>
            <Grid size={12}>
              
                <ReactQuill placeholder='About Company' modules={{
                 toolbar: {
                   container: [
                     [{ header: "1" }, { header: "2" }, { font: [] }],
                     [{ size: [] }],
                     ["bold", "italic", "underline", "strike", "blockquote"],
                     [
                       { list: "ordered" },
                       { list: "bullet" },
                       { indent: "-1" },
                       { indent: "+1" },
                     ],
                     ["link", "image", "video"],
                     ["code-block"],
                     ["clean"],
                   ],
                 },
                 clipboard: {
                   matchVisual: false,
                 },
               }}
               formats={[
                 "header",
                 "font",
                 "size",
                 "bold",
                 "italic",
                 "underline",
                 "strike",
                 "blockquote",
                 "list",
                 "bullet",
                 "indent",
                 "link",
                 "image",
                 "video",
                 "code-block",
               ]}
              theme="snow" value={aboutCompany} onChange={(e)=>setAboutCompany(e)} />    
            </Grid>
            <Grid size={6}>
                <TextField value={registrationNo} helperText={formError.registrationno} error={formError.registrationno} onFocus={()=>handleError('registrationno','')} onChange={(e)=>setRegistrationNo(e.target.value)} label="Registration No" fullWidth/>
            </Grid>
            <Grid size={6}>
                <TextField value={panCard} helperText={formError.pancard} error={formError.pancard} onFocus={()=>handleError('pancard','')} onChange={(e)=>setPanCard(e.target.value)} label="Pan Card" fullWidth/>
            </Grid>

           
{/* radio buttom */}


{/* ********************** */}

            <Grid size={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
               
                <img src={icon.filename} style={{width:'12%'}}/>
                <div className={classes.helperTextStyle}>{formError.filename}</div>
            </Grid>

            <Grid size={6} style={{display:'flex',alignItems:'center'}}>
            <Button fullWidth startIcon={<CloudUploadIcon />} component='label' variant="contained">
                    <input  onChange={handleIconChange} type="file" multiple  hidden accept="image/*"/>
                    Upload Company Logo
                </Button>
            </Grid>

            <Grid size={6}>
        
             <Button fullWidth variant="contained" onClick={handleClick}>Save</Button> 
            </Grid> 

            <Grid size={6}>
             <Button onClick={clearData} fullWidth variant="contained">Reset</Button> 
             </Grid>
            </Grid>
         

       </div>
    </div>)
}