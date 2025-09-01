import MaterialTable from "@material-table/core";
import { Divider, TextField } from "@mui/material";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { useStyles } from "./SubCategoryCss";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {Select,InputLabel,FormControl,MenuItem} from "@mui/material";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
export default function DisplayAllSubCategory() {
  const classes = useStyles();
  const [subcategory, setSubCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [subcategoryName, setSubCategoryName] = useState("");
  const [icon, setIcon] = useState({ byte: "", filename: "case.png" });
  const [formError, setFormError] = useState({ filename: "" });
  const [buttonStatus, setButtonStatus] = useState(false);
  const [tempPicture, setTempPicture] = useState("");
  const [categoryList,setCategoryList]=useState([])
  const navigate = useNavigate();
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

  const cancelPicture = () => {
    setIcon({ byte: "", filename:` ${serverURL}/images/${tempPicture} `});
    setButtonStatus(false);
  };
  const editAndCancel = () => {
    return (
      <div>
        <Button onClick={handlePictureEdit}>Edit</Button>
        <Button onClick={cancelPicture}>Cancel</Button>
      </div>
    );
  };

  const fetchAllSubCategory = async () => {
    var response = await getData("subcategory/display_all");
    setSubCategory(response.data);
  };
  useEffect(() => {
    fetchAllSubCategory();
  }, []);
  const openDialog=(rowData) => {
   setSubCategoryId(rowData.subcategoryid)
    setCategoryId(rowData.categoryid);
    setSubCategoryName(rowData.subcategoryname);
    setIcon({
      byte: "",
      filename: `${serverURL}/images/${rowData.subcategorypicture}`,
    });
    setTempPicture(rowData.subcategorypicture);
    setOpen(true);
  };

 
    const closeDialog=()=>{
      setOpen(false)
     }
     

  /******SubCatergoryForm******/
  
  const handleError=(label,message)=>{
    setFormError((prev)=>({...prev,[label]:message}))
}
const clearData=()=>{
    setSubCategoryName("")
    setCategoryId("")
   
    setIcon({byte:'',filename:'case.png'})
}
const validateData=()=>{
 var error=false
 if(subcategoryName.length==0)
 {
    handleError('subcategoryname',"subCategoryname should not be blank...")
     error=true 
}

 

return error

}

const handlePictureEdit=async()=>{
  

 var formData=new  FormData()   
 
 formData.append('subcategoryname',subcategoryName)
 formData.append('subcategoryid',subCategoryId)
 formData.append('icon',icon.byte)
  
 var response=await postData('subcategory/edit_subcategory_picture',formData)
 if(response.status)
 {
 Swal.fire({
    icon: "success",
    text: response.message,
    toast:true,
   
  });
 
  setButtonStatus(false)
  
}
else
{
    Swal.fire({
        icon: "error",
        text: response.message,
        toast:true
      });
      setButtonStatus(false)
 
}

fetchAllSubCategory()
}


const handleSubCategoryEdit=async()=>{
  var error=validateData()
if(error==false)
   {   

var body={'subcategoryid':subCategoryId,'subcategoryname':subcategoryName}

 
var response=await postData('subcategory/edit_subcategory_data',body)
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
fetchAllSubCategory()
}
const handleDelete=async()=>{

var body={'subcategoryid':subCategoryId}


var response=await postData('subcategory/delete_subcategory',body)
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
setOpen(false)
fetchAllSubCategory()
}

const handleIconChange=(e)=>{
    setButtonStatus(true)
    setIcon({byte:e.target.files[0],filename:URL.createObjectURL(e.target.files[0])})
    handleError("filename","")
}
const showSubCategoryForm=()=>{
return(
   <div >
   <Grid container spacing={2}>
        <Grid size={12}>
           
                <TitleComponent title="Edit subCategory"/>
           
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
            <TextField value={subcategoryName} helperText={formError.subcategoryname} error={formError.subcategoryname} onFocus={()=>handleError('subcategoryname','')} onChange={(e)=>setSubCategoryName(e.target.value)} label="SubCategory Name" fullWidth/>
        </Grid>

        <Grid size={12} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
           
            <img src={icon.filename} style={{width:'20%'}}/>
            <div className={classes.helperTextStyle}>{formError.filename}</div>
        </Grid>

        <Grid size={12}>
        {buttonStatus?editAndCancel():
        <Button fullWidth startIcon={<CloudUploadIcon />} component='label' variant="contained">
                <input  onChange={handleIconChange} type="file" multiple  hidden accept="image/*"/>
                Upload
            </Button>}
        </Grid>

        <Grid size={6}>
    
         <Button fullWidth variant="contained" onClick={handleSubCategoryEdit}>Edit</Button> 
        </Grid> 

        <Grid size={6}>
         <Button onClick={handleDelete} fullWidth variant="contained">Delete</Button> 
         </Grid>
        </Grid>
     
   </div>
)};

  const showDialog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{showSubCategoryForm()}</DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  function showALLSubCategory() {
    return (
      <MaterialTable
        title=" SubCategory List"
        columns={[
          { title: "SubCategoryID", field: "subcategoryid" },
          { title: "CategoryID", render:(rowData)=><div>[{rowData.categoryid}] {rowData.categoryname}</div>  },
          { title: "SubCategoryName", field: "subcategoryname" },
          {
            title: "Icon",render: (rowData) => (
              <img src={`${serverURL}/images/${rowData.subcategorypicture}`}width={40}/>)},
        ]}
        data={subcategory} actions={[
          {
            icon: "edit", tooltip: "Save User",onClick: (event, rowData) => openDialog(rowData), },
            {
              icon: 'add',
              tooltip: 'Add Category',
              isFreeAction: true,
              onClick: (event) => navigate('/dashboardadmin/subcategory')
            }
          ]}/>
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {showALLSubCategory()}
        {showDialog()}
      </div>
    </div>
  );
}