import Radio from '@mui/material/Radio';
import TitleComponent from '../components/TitleComponent';
import { useStyles } from "./CompanyJobsCss"
import { Button, Divider, FormHelperText, TextField } from "@mui/material";
// import TitleComponent from "../src/admin/components/TitleComponent"
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react'
import { getData, postData, passwordgenerator } from "../../services/FetchNodeServices";
import Swal from 'sweetalert2'
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import { FormLabel, RadioGroup, FormControlLabel } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CenterFocusStrong, Message } from '@mui/icons-material';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
// import { label } from '@mui/icons-material';
import { title } from '@mui/icons-material';
import MaterialTable from "@material-table/core";
import { serverURL } from "../../services/FetchNodeServices";
import { Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";



import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default function DisplayAllCompanyJobs() {
    const classes = useStyles();
    // const [requiredskills, setRequiredSkills] = useState([]);
    const [open, setOpen] = useState(false);
    const [categoryId, setCategoryId] = useState('')
    // const [subcategoryId, setSubCategoryId] = useState('')

    const [skills, setSkills] = useState([])
    const [companyJobsList, setCompnayJobsList] = useState([])
    const [formError, setFormError] = useState('');
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [companyId, setCompanyId] = useState('')
    // const [categoryId, setCategoryId] = useState('')
    const [subCategoryId, setSubCategoryId] = useState('')
    // const [skills, setSkills] = useState('')
    const [educationQualification, setEducationQualification] = useState('')
    const [experience, setExperience] = useState('')
    const [jobDeatails, setJobDeatails] = useState('')
    const [jobType, setJobType] = useState('')
    const [minSalary, setMinSalary] = useState('')
    const [maxSalary, setMaxSalary] = useState('')
    const [schedule, setSchedule] = useState('')
    const [benifits, setBenifits] = useState('')
    const [workLocationState, setWorkLocationState] = useState('')
    const [workLocationCity, setWorkLocationCity] = useState('')
    const [supplementalPay, setSupplementalPay] = useState('')
    const [postDate, setPostDate] = useState('')
    const [applicationDeadline, setApplicationDeadline] = useState('')
    const [expectedStart, setExpectedStart] = useState('')
    const [applicationQuestion, setApplicationQuestion] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [emailAddress, setEmailAddress] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [stateId, setStateId] = useState('')
    const [cityId, setCityId] = useState('')
    const [jobId, setJobId] =useState("")

    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])
    const [skillsList, setSkillsList] = useState([]);
    const [selectedValues, setSelectedValues] = React.useState([]);

    const educationqualification = [
        { title: 'High School' },
        { title: 'Higher Secondery School' },
        { title: 'Betech' },
        { title: 'BSC' },
        { title: 'MBA' },
        { title: 'BCOM' },
        { title: 'BA' },
        { title: 'MCA' },
    ];

    const handleChange = (event, newValue) => {

        setEducationQualification(newValue)


    };


    const handelCityChange = (e, v) => {
        // var city = v.map((item) => item.cityid)
        // setCityId(city + "")
        // fetchAllCity(e.target.value)
        setWorkLocationCity(v)
    }
    const fetchAllCity = async () => {
        const response = await getData("companyjobs/fetch_all_city");


        setCityList(response.data);

    };

    useEffect(() => {
        fetchAllCity();
    }, []);

    const fillCityMenu = () => {
        return cityList.map((item) => (
            <MenuItem key={item.cityid} value={item.cityid}>
                {item.cityname}
            </MenuItem>
        ));
    };



    const handelSubCategoryChanges = async (value) => {
        const subCategoryid = value;
        await fetchSkillsBySubCategory(subCategoryid);
    }


    const fetchSkillsBySubCategory = async (subcategoryid) => {

        const response = await postData("companyjobs/fetch_skills_by_subcategory", { subcategoryid });
        setSkillsList(response.data)


    };


   

    const fillSkillMenu = () => {
        return skillsList.map((skill) => (
            <MenuItem key={skill.skillid} value={skill.skillid}>
                {skill.skills}
            </MenuItem>
        ));
    };

    const handleSkill = (e, v) => {
        setSkills(v)

    }
    const handelSubCategoryChange = (e) => {
        setCategoryId(e.target.value)
        // setSubCategoryId(e.target.value)
        fetchAllSubCategory(e.target.value)
    }

    const fetchAllCategory = async () => {
        const response = await getData("companyjobs/fetch_all_category");


        setCategoryList(response.data);

    };

    useEffect(() => {
        fetchAllCategory();
    }, []);

    const fillCategoryMenu = () => {
        return categoryList.map((item) => (
            <MenuItem key={item.categoryid} value={item.categoryid}>
                {item.categoryname}
            </MenuItem>
        ));
    };



    const fetchAllSubCategory = async (categoryid) => {
        const response = await postData("companyjobs/fetch_all_subcategory", { categoryid });
        setSubCategoryList(response.data);

    };


    const fillSubCategoryMenu = () => {
        return subCategoryList.map((item) => (
            <MenuItem key={item.subcategoryid} value={item.subcategoryid}>
                {item.subcategoryname}
            </MenuItem>
        ));
    };

    const fetchAllCompanyjobs = async () => {
        var response = await getData("companyjobs/display_all");
        setCompnayJobsList(response.data);
    };
    useEffect(() => {
        fetchAllCompanyjobs();
    }, []);
    const openDialog = (rowData) => {
        setJobId(rowData.jobid)
        setCompanyId(rowData.companyid)
        setCategoryId(rowData.categoryid);
        fetchAllSubCategory(rowData.categoryid)
        fetchSkillsBySubCategory(rowData.subcategoryid)
        setSubCategoryId(rowData.subcategoryid);
        
        // var sk=rowData.skills.split('#')
        // var skillreq=sk.map(item=>JSON.parse(item))
        // console.log(skillreq);
        
         setSkills(JSON.parse(rowData.skills));

        // var ed=rowData.educationqualification.split('#')
       
        // var edreq=ed.map(item=>JSON.parse(item))
        setEducationQualification(JSON.parse(rowData.educationqualification))
        setExperience(rowData.experience)
        setJobDeatails(rowData.jobdeatails)
        setJobType(rowData.jobtype)
        setMinSalary(rowData.minsalary)
        setMaxSalary(rowData.maxsalary)
        setSchedule(rowData.schedule)
        setBenifits(rowData.benifits)
        // var wl=rowData.worklocationcity.split('#')
        // var wlreq=wl.map(item=>JSON.parse(item))
        setWorkLocationCity(JSON.parse(rowData.worklocationcity))
        setSupplementalPay(rowData.supplementalpay)
        // const dd=new Date(rowData.postdate)
        // const date = dd.getFullYear()+"-"+(dd.getMonth()+1>9 ?(dd.getMonth()+1):"0"+(dd.getMonth()+1)) +"-"+dd.getDate()
        // console.log(date);
        
        // setPostDate(date.slice(0,10))
        setPostDate(rowData.postdate)
        setApplicationDeadline(rowData.applicationdeadline)
        setExpectedStart(rowData.expectedstart)
        setApplicationQuestion(rowData.applicationquestion)
        setContactPerson(rowData.contactperson)
        setEmailAddress(rowData.emailaddress)
        setMobileNo(rowData.mobileno)
        setOpen(true);
    };

    const closeDialog = () => {
        setOpen(false);
    };

    const handleError = (label, message) => {
        setFormError((prev) => ({ ...prev, [label]: message }))
    }
    const handleCompanyJobsEdit = async () => {
        var error = validateData();
        if (error == false) {
            var body = {
                companyid: companyId, categoryid: categoryId, subcategoryid: subCategoryId,
                skills: JSON.stringify(skills), educationqualification: JSON.stringify(educationQualification), experience: experience,
                jobdeatails: jobDeatails, jobtype: jobType, minsalary: minSalary, maxsalary: maxSalary,
                schedule: schedule, benifits: benifits, worklocationstate: stateId,
                worklocationcity: JSON.stringify(workLocationCity), supplementalpay: supplementalPay, postdate: postDate,
                applicationdeadline: applicationDeadline, expectedstart: expectedStart,
                applicationquestion: applicationQuestion, contactperson: contactPerson, emailaddress: emailAddress,
                mobileno: mobileNo, jobid: jobId
            };

            var response = await postData("companyjobs/edit_companyjobs_data", body);
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
        // setOpen(false);
        fetchAllCompanyjobs();
    };

    const validateData = () => {
        var error = false
        if (companyId.length == 0) {
            handleError('companyid', "companyid should not be blank")
            error = true
        }


        if (categoryId.length == 0) {
            handleError('categoryid', "category should not be blank")
            error = true
        }

        if (subCategoryId.length == 0) {
            handleError('subCategoryid', "subCategory should not be blank")
            error = true
        }
        if (skills.length == 0) {
            handleError('skills', "skills should not be blank")
            error = true
        }
        if (educationQualification.length == 0) {
            handleError('educationqualification', "educationqualification should not be blank")
            error = true
        }
        if (experience.length == 0) {
            handleError('experience', "experience should not be blank")
            error = true
        }
        if (jobDeatails.length == 0) {
            handleError('jobdetails', "jobdetails should not be blank")
            error = true
        }
        if (jobType.length == 0) {
            handleError('jobtype', "jobtype should not be blank")
            error = true
        }
        if (minSalary.length == 0) {
            handleError('minsalary', "minsalary should not be blank")
            error = true
        }
        if (maxSalary.length == 0) {
            handleError('maxsalary', "maxsalary should not be blank")
            error = true
        }
        if (schedule.length == 0) {
            handleError('schedule', "schedule should not be blank")
            error = true
        }
        if (benifits.length == 0) {
            handleError('benifits', "benifits should not be blank")
            error = true
        }
        if (workLocationCity.length == 0) {
            handleError('worklocationcity', "worklocationcity should not be blank")
            error = true
        }
        if (postDate.length == 0) {
            handleError('postdate', "postdate should not be blank")
            error = true
        }
        if (applicationDeadline.length == 0) {
            handleError('applicationdedline', "applicationdedline should not be blank")
            error = true
        }
        if (postDate.length == 0) {
            handleError('postdate', "postdate should not be blank")
            error = true
        }
        if (contactPerson.length == 0) {
            handleError('contactperson', "contactperson should not be blank")
            error = true
        }
        if (emailAddress.length == 0) {
            handleError('emailaddress', "emailaddress should not be blank")
            error = true
        }
        if (mobileNo.length == 0) {
            handleError('mobileno', "mobileno should not be blank")
            error = true
        }
        console.log(formError)
        return error
    }
    const showCompanyJobs = () => {
        return (<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid size={12}>

                        <TitleComponent title="Companyjobs registration" />

                    </Grid>
                    <Grid size={12} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Divider style={{ width: '98%' }} />
                    </Grid>
                    <Grid size={4}>
                        <TextField value={companyId} helperText={formError.companyid} error={formError.companyid} onFocus={() => ('companyid', '')} onChange={(e) => setCompanyId(e.target.value)} label="Company ID" fullWidth />
                    </Grid>



                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>Category ID</InputLabel>
                            <Select label="categoryId" value={categoryId} helperText={formError.categoryid} error={formError.categoryid} onFocus={() => handleError('categoryid', '')}
                                onChange={handelSubCategoryChange}>

                                {fillCategoryMenu()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>SubCategory Id</InputLabel>
                            <Select label="subcategoryId" value={subCategoryId} helperText={formError.subcategoryid} error={formError.subcategoryid} onFocus={() => handleError('subCategoryid', '')}
                                onChange={(e) => {
                                    setSubCategoryId(e.target.value)
                                    handelSubCategoryChanges(e.target.value)
                                }} >

                                {fillSubCategoryMenu()}
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid size={12}>
                        <Autocomplete
                            fullWidth
                            multiple
                            onChange={handleSkill}
                            options={skillsList}
                            disableCloseOnSelect
                            value={skills}
                            getOptionLabel={(option) => option.skills}
                            renderOption={(props, option, { selected }) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <li key={option.skillid} {...optionProps}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                            value={option.skillid}
                                        />
                                        {option.skills}
                                    </li>
                                );
                            }}

                            style={{ width:'100%' }}
                            renderInput={(params) => (
                                <TextField {...params} label="Skills" placeholder="Skills" />
                            )}
                        />

                    </Grid>

                    <Grid item xs={4}>
                        <Autocomplete
                            fullWidth
                            multiple
                            onChange={handleChange}
                            options={educationqualification}
                            value={educationQualification}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, { selected }) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <li key={option.title} {...optionProps}>
                                        <Checkbox

                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                            value={option.title}
                                        />
                                        {option.title}
                                    </li>
                                );
                            }}
                            style={{ width: 487 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Education Qualification" placeholder="Education Qualification" />
                            )}
                        />
                    </Grid>
                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>experience</InputLabel>
                            <Select value={experience} label="experience" onChange={(e) => setExperience(e.target.value)}>
                                <MenuItem value={">10year"}>More than 10 year</MenuItem>
                                <MenuItem value={"5-10 year"}>5-10 year</MenuItem>
                                <MenuItem value={"2-5 year"}>2-5 year</MenuItem>
                                <MenuItem value={"1-2 year"}>1-2 year</MenuItem>
                                <MenuItem value={"Fresher"}>Fresher</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>

                        <ReactQuill placeholder='JobDetail' modules={{
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
                            ]}
                            theme='snow' value={jobDeatails} helperText={formError.jobdeatails} onFocus={() => handleError('jobdetails', '')} onChange={(e) => setJobDeatails(e)} />
                        <FormHelperText style={{ color: 'red' }} >{formError.jobDeatails}</FormHelperText>
                    </Grid>

                    <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>jobType</InputLabel>
                            <Select value={jobType} label="Jobtype" onChange={(e) => setJobType(e.target.value)} >
                                <MenuItem value={"Fulltime"}>Fulltime</MenuItem>
                                <MenuItem value={"Parttime"}>Parttime</MenuItem>
                                <MenuItem value={"Intern"}>Intern</MenuItem>
                                <MenuItem value={"Remote"}>Fulltime</MenuItem>
                                <MenuItem value={"Hybrid"}>Parttime</MenuItem>
                                <MenuItem value={"Work For Home"}>Wfh</MenuItem>
                                <MenuItem value={"US Time"}>US Time</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={4}>
                        <TextField value={minSalary} helperText={formError.minsalary} error={formError.minsalary} onFocus={() => ('minsalary', '')} onChange={(e) => setMinSalary(e.target.value)} label="MinSalary" fullWidth />
                    </Grid>
                    <Grid size={4}>
                        <TextField value={maxSalary} helperText={formError.maxsalary} error={formError.maxsalary} onFocus={() => ('maxsalary', '')} onChange={(e) => setMaxSalary(e.target.value)} label="MaxSalary" fullWidth />
                    </Grid>

                    <Grid size={6}>
                        <FormControl fullWidth>
                            <InputLabel>Schedule</InputLabel>
                            <Select value={schedule} label="Schedule" onChange={(e) => setSchedule(e.target.value)}>
                                <MenuItem value={"9AM-5PM"}>9AM-5PM</MenuItem>
                                <MenuItem value={"2PM-10PM"}>2PM-10PM</MenuItem>
                                <MenuItem value={"8PM-4AM"}>8PM-4AM</MenuItem>
                                <MenuItem value={"10PM-6AM"}>10PM-6AM</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>



                    {/* <Grid size={4}>
                        <FormControl fullWidth>
                            <InputLabel>WorkLocationState</InputLabel>
                            <Select label="WorkLocationState" value={stateId} helperText={formError.stateid} error={formError.stateid} onFocus={() => handleError('stateid', '')}
                                onChange={handelStateChange}>
    
                                {fillStateMenu()}
                            </Select>
                        </FormControl>
                    </Grid> */}
                    <Grid size={6}>
                        <Autocomplete
                            multiple
                            onChange={handelCityChange}
                            options={cityList}
                            value={workLocationCity}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.cityname}
                            renderOption={(props, option, { selected }) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <li key={option.cityid} {...optionProps}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                            value={option.cityid}
                                        />
                                        {option.cityname}
                                    </li>
                                );
                            }}
                            style={{ width: 740 }}
                            renderInput={(params) => (
                                <TextField {...params} label="WorkLocation City" placeholder="WorkLocationcity" />
                            )}
                        />
                    </Grid>
                    <Grid size={6}>

                        <ReactQuill placeholder='Benifit' modules={{
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
                                "code-block",
                            ]}
                            theme='snow' value={benifits} helperText={formError.benifits} onFocus={() => handleError('benifits', '')} onChange={(e) => setBenifits(e)} />
                        <FormHelperText style={{ color: 'red' }}>{formError.benifits}</FormHelperText>
                    </Grid>


                    <Grid size={6}>

                        <ReactQuill placeholder='SupplementalPay' modules={{
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
                                "code-block",
                            ]}
                            theme='snow' value={supplementalPay} onChange={(e) => setSupplementalPay(e)} />
                        <FormHelperText style={{ color: 'red' }}></FormHelperText>
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            value={postDate}
                            helperText={formError.postdate} error={formError.postdate} onFocus={() => ('postdate', '')} onChange={(e) => setPostDate(e.target.value)}
                            label="post date"
                            type="date"
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,

                                },
                            }}
                        />
                    </Grid>
                    <Grid size={4}>
                        <TextField
                            value={applicationDeadline}
                            onChange={(e) => setApplicationDeadline(e.target.value)}
                            label="Application Deadline"
                            type="date"
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,

                                },
                            }}
                        />
                    </Grid>

                    <Grid size={4}>
                        <TextField
                            value={expectedStart}
                            onChange={(e) => setExpectedStart(e.target.value)}
                            label="Expected Start"
                            type="date"
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,

                                },
                            }}
                        />
                    </Grid>
                    <Grid size={12}>

                        <ReactQuill placeholder='Application Question' modules={{
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
                            theme='snow' value={applicationQuestion} onChange={(e) => setApplicationQuestion(e)} />
                        <FormHelperText style={{ color: 'red' }}></FormHelperText>
                    </Grid>

                    <Grid size={4}>
                        <TextField value={contactPerson} helperText={formError.contactperson} error={formError.contactperson} onFocus={() => ('contactperson', '')} onChange={(e) => setContactPerson(e.target.value)} label="Contact Person" fullWidth />
                    </Grid>

                    <Grid size={4}>
                        <TextField value={emailAddress} helperText={formError.emailaddress} error={formError.emailaddress} onFocus={() => ('emailaddress', '')} onChange={(e) => setEmailAddress(e.target.value)} label="Email Address" fullWidth />
                    </Grid>

                    <Grid size={4}>
                        <TextField value={mobileNo} helperText={formError.mobileno} error={formError.mobileno} onFocus={() => ('mobileno', '')} onChange={(e) => setMobileNo(e.target.value)} label="Mobile No" fullWidth />
                    </Grid>
                    <Grid size={6}>

                        <Button fullWidth variant="contained" onClick={handleCompanyJobsEdit}>Edit</Button>
                    </Grid>

                    <Grid size={6}>
                        <Button fullWidth variant="contained">Reset</Button>
                    </Grid>
                </Grid>


            </div>
        </div>)
    }

    const showDialog = () => {
        return (
            <Dialog open={open}>
                <DialogContent>{showCompanyJobs()}</DialogContent>
                <DialogActions>
                    <Button onClick={() => closeDialog()}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    };

    function showALLCompanyjobs() {
        return (
            <MaterialTable
                title="Required skill List"
                columns={[
                    { title: "ID", field: "jobid" },
                    { title: "category id", render: (rowData) => <div>{rowData.categoryname}</div> },
                    { title: "SubCategory id", render: (rowData) => <div>{rowData.subcategoryname}</div> },
                   

                ]}
                data={companyJobsList}
                actions={[
                    {
                        icon: "edit",
                        tooltip: "Save User",
                        onClick: (event, rowData) => openDialog(rowData),
                    }]} />);
    }
    return (
        <div className={classes.root}>
            <div className={classes.box}>
                {showALLCompanyjobs()}
                {/* {showCompanyJobs()} */}
                {showDialog()}
            </div>
        </div>
    );
}