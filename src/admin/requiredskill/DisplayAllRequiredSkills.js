import { useStyles } from "./RequiredSkillsCSS";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import { Divider,Button , TextField } from "@mui/material";
import {Select,InputLabel, FormControl, MenuItem} from "@mui/material"
import { useState, useEffect } from "react";
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import MaterialTable from "@material-table/core";
import { Dialog, DialogContent,  DialogActions} from "@mui/material";
import { useNavigate } from "react-router";


export default function DisplayAllRequiredSkills(){
    const classes = useStyles();
    const [requiredskills, setRequiredSkills] = useState([])
    const [open,setOpen] = useState(false)
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    const [categoryList,  setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [skills, setSkills]= useState('')
    const [formError,setformError] = useState({filename:''})
    const [skillsId, setSkillsId] = useState('')
    const navigate = useNavigate();

    const handleRequiredSkillsDelete=async()=>{
        var body = {'skillsid':skillsId}
        var response =await postData("requiredskills/delete_requiredskills",body)
        if(response.status){
            Swal.fire({
            icon: "success",
            text: response.message,
            toast: true
              });
              setOpen(false)
            }
            else{
               Swal.fire({
                  icon: "error",
                  text: response.message,
                  toast: true
                       });
            }

            fetchAllRequiredSkills()
            setOpen(false)

    }


    /********************************************************/

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

    const handleSubCategoryEdit=async()=>{
        var error = validateData()
        if(error===false)
        {

        var body = {'categoryid':categoryId,'subcategoryid':subCategoryId,'skills':skills, 'skillsid':skillsId}

        var response = await postData('requiredskills/edit_requiredskills_data',body)

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
        fetchAllRequiredSkills()
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

    
    const showRequiredSkillsForm=()=>{
    return (
            <div>
            <Grid container spacing={2}>

                    <Grid size={12}>
                        <TitleComponent title="Edit Skills Registration" />
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
                     <Button  fullWidth variant="contained" onClick={handleSubCategoryEdit} >Edit</Button>
                  </Grid>

                  <Grid size={6}>
                      <Button fullWidth variant="contained" onClick={handleRequiredSkillsDelete}>Delete</Button>
                  </Grid>

            </Grid>
            </div>
    )
}
    /********************************************************/

    const showDialog=()=>{
        return <Dialog open={open}>
            <DialogContent>{showRequiredSkillsForm()}</DialogContent>
            <DialogActions>
                <Button onClick={()=>closeDialog()}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    }

    const openDialog=(rowData)=>{
      fetchAllSubCategory(rowData.categoryid)
        
      setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setSkills(rowData.skills)
        setSkillsId(rowData.skillid)
        setOpen(true)
    }

    const closeDialog=()=>{
        setOpen(false)
    }

    const fetchAllRequiredSkills=async()=>{
        var response = await getData("requiredskills/display_all_requiredskills")
        setRequiredSkills(response.data)
    }
    useEffect(()=>{
        fetchAllRequiredSkills()
    },[])

    function ShowAllRequiredSkills() {
        return (
          <MaterialTable
            title="Required Skills List"
            columns={[
              { title: 'Skill Id', field: 'skillid' },
              { title: 'Category Name', field: 'categoryname' },
              { title: 'SubCategory Name', field: 'subcategoryname' },
              { title: 'Skills', field: 'skills' },
            ]}
            data={requiredskills}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Save User',
                onClick: (event, rowData) => openDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboardadmin/requiredskills')
              }
            ]}
          />
        )
      }

    return (
        <div className={classes.roott}>
            <div className={classes.boxx}>
                {ShowAllRequiredSkills()}
                {showDialog()}
            </div>
        </div>
    )
}