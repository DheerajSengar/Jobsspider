import Radio from '@mui/material/Radio';
import MaterialTable from "@material-table/core";
import { Divider, TextField } from "@mui/material";
import TitleComponent from "../components/TitleComponent";
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import { useStyles } from "./CompanyCss";
import { postData, getData, serverURL } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { Button, Dialog, DialogTitle, FormHelperText, DialogContent, DialogActions, } from "@mui/material";
import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import { Select, InputLabel, MenuItem } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Switch from '@mui/material/Switch';



export default function CompanyVerification() {
  const classes = useStyles();
  const [company, setCompany] = useState([]);
  const [open, setOpen] = useState(false);
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyOwner, setCompanyOwner] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [panCard, setPanCard] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState("");
  const [icon, setIcon] = useState({ byte: "", filename: "case.png" });
  const [formError, setFormError] = useState({ filename: "" });
  const [buttonStatus, setButtonStatus] = useState(false);
  const [tempPicture, setTempPicture] = useState("");
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const [checked, setChecked] = useState(0)

  const handelStateChange = (e) => {
    setStateId(e.target.value)
    fetchAllCity(e.target.value)
  }

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
    const response = await postData("statecity/fetch_all_city", { stateid });
    setCityList(response.data);

  };


  const fillCityMenu = () => {
    return cityList.map((item) => (
      <MenuItem key={item.cityid} value={item.cityid}>
        {item.cityname}
      </MenuItem>
    ));
  };



  const cancelPicture = () => {
    setIcon({ byte: "", filename: `${serverURL}/images/${tempPicture} ` });
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

  const fetchAllCompany = async () => {
    var response = await getData("company/display_all");
    setCompany(response.data);
  };
  useEffect(() => {
    fetchAllCompany();
  }, []);
  const openDialog = (rowData) => {
    setCompanyId(rowData.companyid);
    setCompanyName(rowData.companyname);
    setCompanyOwner(rowData.companyowner);
    setCompanyAddress(rowData.companyaddress);
    setStateId(rowData.stateid);
    fetchAllCity(rowData.stateid)
    setCityId(rowData.cityid);
    setEmailId(rowData.emailid);
    setMobileNo(rowData.mobileno);
    setContactPerson(rowData.contactperson);
    setAboutCompany(rowData.aboutcompany);
    setRegistrationNo(rowData.registrationno);
    setPanCard(rowData.pancard);
    setPassword(rowData.password);
    setVerified(rowData.verified);
    setIcon({
      byte: "",
      filename: `${serverURL}/images/${rowData.logo}`,
    });
    setTempPicture(rowData.logo);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  /*Catrgory Form*************************************************************/

  const handleError = (label, message) => {
    setFormError((prev) => ({ ...prev, [label]: message }));
  };

  const validateData = () => {
    var error = false;
    if (companyId.length == 0) {
      handleError("companyid", "Companyid should not be blank...");
      error = true;
    }


    if (companyName.length == 0) {
      handleError("companyname", "Companyname should not be blank...");
      error = true;
    }

    if (companyOwner.length == 0) {
      handleError("companyowner", "Companyowner should not be blank...");
      error = true;
    }


    if (companyAddress.length == 0) {
      handleError("companyaddress", "Companyaddress should not be blank...");
      error = true;
    }


    if (stateId.length == 0) {
      handleError("stateid", "Stateid should not be blank...");
      error = true;
    }



    if (cityId.length == 0) {
      handleError("stateid", "Stateid should not be blank...");
      error = true;
    }



    if (emailId.length == 0) {
      handleError("emailid", "Emailid should not be blank...");
      error = true;
    }


    if (mobileNo.length == 0) {
      handleError("mobileno", "Mobileno should not be blank...");
      error = true;
    }


    if (contactPerson.length == 0) {
      handleError("contactperson", "Contactperson should not be blank...");
      error = true;
    }


    if (aboutCompany.length == 0) {
      handleError("aboutcompany", "AboutCompany should not be blank...");
      error = true;
    }


    if (registrationNo.length == 0) {
      handleError("registrationno", "registrationno should not be blank...");
      error = true;
    }



    if (panCard.length == 0) {
      handleError("pancard", "Pancard should not be blank...");
      error = true;
    }


    // if (password.length == 0) {
    //   handleError("password", "Password should not be blank...");
    //   error = true;
    // }


    if (verified.length == 0) {
      handleError("verified", "Verdied should not be blank...");
      error = true;
    }

    return error;
  };

  const handlePictureEdit = async () => {
    var formData = new FormData();

    formData.append("companyid", companyId);
    formData.append("companyname", companyName);
    formData.append("companyowner", companyOwner);
    formData.append("companyaddress", companyAddress);
    formData.append("stateid", stateId);
    formData.append("cityid", cityId);
    formData.append("emailid", emailId);
    formData.append("mobileno", mobileNo);
    formData.append("contactperson", contactPerson);
    formData.append("aboutcompany", aboutCompany);
    formData.append("registrationno", registrationNo);
    // formData.append("pancard", panCard);
    formData.append("password", password);
    formData.append("verified", 'false');
    formData.append("icon", icon.byte);

    var response = await postData("company/edit_company_picture", formData);
    if (response.status) {
      Swal.fire({
        icon: "success",
        text: response.message,
        toast: true,
      });

      setButtonStatus(false);
    } else {
      Swal.fire({
        icon: "error",
        text: response.message,
        toast: true,
      });
      setButtonStatus(false);
    }

    fetchAllCompany();
  };

  const handleCompanyEdit = async () => {
    var error = validateData();
    if (error == false) {
      var body = { companyid: companyId, companyname: companyName, companyowner: companyOwner, companyaddress: companyAddress, stateid: stateId, cityid: cityId, emailid: emailId, mobileno: mobileNo, contactperson: contactPerson, aboutcompany: aboutCompany, registrationno: registrationNo, pancard: panCard, password: password, verified: verified };

      var response = await postData("company/edit_company_data", body);
      if (response.status) {
        Swal.fire({
          icon: "success",
          text: response.message,
          toast: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          text: response.message,
          toast: true,
        });
      }
    }
    fetchAllCompany();
  };
  const handleDelete = async () => {
    var body = { companyid: companyId };

    var response = await postData("company/delete_company", body);
    if (response.status) {
      Swal.fire({
        icon: "success",
        text: response.message,
        toast: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: response.message,
        toast: true,
      });
    }
    setOpen(false);
    fetchAllCompany();
  };

  const handleIconChange = (e) => {
    setButtonStatus(true);
    setIcon({
      byte: e.target.files[0],
      filename: URL.createObjectURL(e.target.files[0]),
    });
    handleError("filename", "");
  };
  const showCompanyForm = () => {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TitleComponent title="Edit Company" />
          </Grid>
          <Grid size={12} style={{ display: "flex", justifyContent: "center" }}>
            <Divider style={{ width: "98%" }} />
          </Grid>

          <Grid size={6}>
            <TextField value={companyId} helperText={formError.companyid} error={formError.companyid} onFocus={() => handleError('companyid', '')} onChange={(e) => setCompanyId(e.target.value)} label="Company Id" fullWidth />
          </Grid>


          <Grid size={6}>
            <TextField value={companyName} helperText={formError.companyname} error={formError.companyname} onFocus={() => handleError('companyname', '')} onChange={(e) => setCompanyName(e.target.value)} label="Company Name " fullWidth />
          </Grid>


          <Grid size={6}>
            <TextField value={companyOwner} helperText={formError.companyowner} error={formError.companyowner} onFocus={() => handleError('companyowner', '')} onChange={(e) => setCompanyOwner(e.target.value)} label="Company Owner " fullWidth />
          </Grid>


          <Grid size={6}>
            <TextField value={companyAddress} helperText={formError.companyaddress} error={formError.companyaddress} onFocus={() => handleError('companyaddress', '')} onChange={(e) => setCompanyAddress(e.target.value)} label="Company Address " fullWidth />
          </Grid>


          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel>State Id</InputLabel>
              <Select label="StateId" value={stateId} helperText={formError.stateid} error={formError.stateid} onFocus={() => handleError('stateid', '')}
                onChange={handelStateChange}>

                {fillStateMenu()}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel>City Id</InputLabel>
              <Select label="CityId" value={cityId} helperText={formError.cityid} error={formError.cityid} onFocus={() => handleError('cityid', '')}
                onChange={(e) => setCityId(e.target.value)}>

                {fillCityMenu()}
              </Select>
            </FormControl>
          </Grid>


          <Grid size={6}>
            <TextField value={emailId} helperText={formError.emailid} error={formError.emailid} onFocus={() => handleError('emailid', '')} onChange={(e) => setEmailId(e.target.value)} label="Email Id " fullWidth />
          </Grid>


          <Grid size={6}>
            <TextField value={mobileNo} helperText={formError.mobileno} error={formError.mobileno} onFocus={() => handleError('mobileno', '')} onChange={(e) => setMobileNo(e.target.value)} label="Mobile No" fullWidth />
          </Grid>


          <Grid size={6}>
            <TextField value={contactPerson} helperText={formError.contactperson} error={formError.contactperson} onFocus={() => handleError('contactperson', '')} onChange={(e) => setContactPerson(e.target.value)} label="Contact Person " fullWidth />
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
              theme='snow' value={aboutCompany} helperText={formError.aboutCompany} onFocus={() => handleError('aboutCompany', '')} onChange={(e) => setAboutCompany(e)} />
            <FormHelperText style={{ color: 'red' }}>{formError.aboutCompany}</FormHelperText>
          </Grid>

          <Grid size={6}>
            <TextField value={registrationNo} helperText={formError.registrationno} error={formError.registrationno} onFocus={() => handleError('registrationno', '')} onChange={(e) => setRegistrationNo(e.target.value)} label="Registration No" fullWidth />
          </Grid>


          <Grid size={6}>
            <TextField value={panCard} helperText={formError.pancard} error={formError.pancard} onFocus={() => handleError('pancard', '')} onChange={(e) => setPanCard(e.target.value)} label="PanCard " fullWidth />
          </Grid>





          <Grid
            size={12}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={icon.filename} style={{ width: "20%" }} />
            <div className={classes.helperTextStyle}>{formError.filename}</div>
          </Grid>

          <Grid size={12}>
            {buttonStatus ? (
              editAndCancel()
            ) : (
              <Button
                fullWidth
                startIcon={<CloudUploadIcon />}
                component="label"
                variant="contained"
              >
                <input
                  onChange={handleIconChange}
                  type="file"
                  multiple
                  hidden
                  accept="image/*"
                />
                Upload
              </Button>
            )}
          </Grid>

          <Grid size={6}>
            <Button fullWidth variant="contained" onClick={handleCompanyEdit}>
              Edit
            </Button>
          </Grid>

          <Grid size={6}>
            <Button onClick={handleDelete} fullWidth variant="contained">
              Delete
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  };
  //

  const showDialog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>{showCompanyForm()}</DialogContent>
        <DialogActions>
          <Button onClick={() => closeDialog()}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };
  const handleChange=async(e,companyid)=>{
      
    
    
    var bool=0
    var message=''
    if(e.target.checked==true)
     {bool=1
     message="Do you want to verify the company?"}
    else  if(e.target.checked==false)
     { message="Do you want to unverify the company?" 
     bool=0 }
     Swal.fire({
      title: message,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Not Confirm`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var res=await postData('company/update_company_verify',{verified:bool,companyid})
        Swal.fire(res.message);
        fetchAllCompany()
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    

   
   
    

  }
  function showALLCompany() {
    return (
      <MaterialTable
        title="Company List"
        columns={[
          { title: "Verify", render:rowData=><Switch
            checked={rowData.verified}
            onChange={(e)=>handleChange(e,rowData.companyid)}
            inputProps={{ 'aria-label': 'controlled' }}
          /> },
          { title: "ID", field: "companyid" },
          { title: "Company Name", render:rowData=><div>
            {rowData.companyname}<br/>
           {rowData.companyowner}
          </div>},
           
          { title: "Company Address",  render:rowData=><div>
           {rowData.companyaddress}<br/>
          {rowData.statename},{rowData.cityname}
        </div> },
          { title: "Contact Person", render:rowData=><div>
          {rowData.contactperson}<br/>
          {rowData.emailid}<br/>
          {rowData.mobileno}
        </div>},
          
          { title: "Pan/Reg",render:rowData=><div>
            {rowData.pancard}<br/>
            {rowData.registrationno}
         
        </div> },
        
          
          { title: "Verified/Not Verified", field: "verified" },
          { title: "Icon", render: (rowData) => (<img src={`${serverURL}/images/${rowData.logo}`} width={40} />), },]}
        data={company}
        
      />
    );
  }
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {showALLCompany()}
        {showDialog()}
      </div>
    </div>
  );
}