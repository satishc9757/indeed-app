import {  Button, Card, CardContent, Container, Grid, IconButton, Link, List, ListItem, ListItemIcon, Modal, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import backendServer from "../../webConfig";
import Avatar from '@mui/material/Avatar';
import ImageUpload from "./uploadProfile";
import NavBar from "../../components/user/NavBar";
import Box from '@mui/material/Box';
import { ListItemButton, ListItemText, Stack } from "@mui/material";
const axios = require('axios');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CompanyProfile () {
    const [firstName, setFirstName] = React.useState([]);
    const [lastName, setLastName] = React.useState([]);
    const [role, setRole] = React.useState('');
    const [state, setState] = React.useState('');
    const [city, setCity] = React.useState('');
const [profile, setProfile] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [webSite, setWebsite] = React.useState('');
    const [companySize, setCompanySize] = React.useState('');
    const [companyType, setCompanyType] = React.useState('');
    const [revenue, setRevenue] = React.useState('');
    const [headquarters, setHeadquarters] = React.useState('');
    const [industry, setIndustry] = React.useState('');
    const [founded, setFounded] = React.useState('');
    const [mission, setMission] = React.useState('');
    const [visison, setVision] = React.useState('');
    const [CEO, setCEO] = React.useState('');
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const updateProfile = async() => {

        let emp_id=sessionStorage.getItem("emp-id")

        let data = {
            "emp_id": emp_id,
            "emp_name": firstName + ' ' + lastName,
            "emp_city": city,
            "emp_state": state,
            "emp_country": country,
            "emp_role": role
        }
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        axios.post(`${backendServer}/employer/updateProfile`,data)
            .then(response => {
                console.log(response)
            }).catch=(error) => {
                console.log(error)
            }
    }

    const uploadProfile = () => {
        
    }
    const updateCompany = async() => {

        let compId = sessionStorage.getItem('emp-company-id')

        console.log(lastName)
        let data = {
            "comp_id": compId,
            "comp_name": city,
            "comp_size": companySize,
            "comp_type": companyType,
            "comp_mission": mission,
            "comp_website": webSite,
            "comp_revenue": revenue,
            "comp_headquarters": headquarters,
            "comp_founded": founded,
            "comp_ceo": CEO,
            "comp_about": ""

        }
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        axios.post(`${backendServer}/company/companyDetails`,data)
            .then(response => {
                console.log(response)
            }).catch=(error) => {
                console.log(error)
            }
        
    }



//     useEffect(() => {
//         // let compId = 2;
//         // let empID = 5;
//         let compId = sessionStorage.getItem('emp_company_id')
//         let empID = sessionStorage.getItem('emp-id')
//         axios.get(`${backendServer}/employer?empID=${empID}`)
//             .then(response => {
//                 let data = response.data[0];
//                 let name = data.emp_name.split(" ")
//                 setFirstName(name[0])
//                 setLastName(name[1])
//                 setRole(data.emp_role)
//                 setCity(data.emp_city)
//                 setState(data.emp_state)
//                 setCountry(data.emp_country)
               
                
//                 axios.get(`${backendServer}/company/companyDetails?compId=${compId}`)
//                     .then(response => {
//                         let data1 = response.data[0];
//                         console.log(data1)
//                         setWebsite(data1.comp_website)
//                         setCompanySize(data1.comp_size)
//                         setCompanyType(data1.comp_type)
//                         setProfile(data1.comp_profile_location)
//                         setCEO(data1.comp_ceo)
//                         setFounded(data1.comp_founded)
//                         setHeadquarters(data1.comp_headquarters)
//                         setMission(data1.comp_mission)
//                         setVision(data1.comp_mission)
//                         setRevenue(data1.comp_revenue)
                        
               
//                     }).catch = (error) => {
//                         console.log(error)
//                     }
//             })

    useEffect(async () => {
        let compId = sessionStorage.getItem("emp_company_id");
        let empID = sessionStorage.getItem("emp-id");
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        var response = await axios.get(`${backendServer}/employer?empID=${empID}`);
        let data = await response.data[0];
        console.log("data ", data);
        let name = await data.emp_name.split(" ")
        await setFirstName(name[0]);
        await setLastName(name[1]);
        await setRole(data.emp_role);
        await setCity(data.emp_city);
        await setState(data.emp_state);
        await setCountry(data.emp_country);
        axios.defaults.headers.common.authorization = await localStorage.getItem("token");
        let data1 = await axios.get(`${backendServer}/company/companyDetails?compId=${compId}`);
        data1 = await data1.data[0];
        console.log("response ",response, data1)
        setWebsite(data1.comp_website)
        setCompanySize(data1.comp_size)
        setCompanyType(data1.comp_type)
        setProfile(data1.comp_profile_location)
        setCEO(data1.comp_ceo)
        setFounded(data1.comp_founded)
        setHeadquarters(data1.comp_headquarters)
        setMission(data1.comp_mission)
        // setVision(data1.comp_mission)
        setRevenue(data1.comp_revenue)

        
        }, [profile, open])


    
    return (
        <div>
            <NavBar />
            <br />
                        <Container style={{
                justifyContent: 'center',
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignContent:"center"
            }}>
                <Stack direction="row" spacing={2}>
                    <IconButton onClick={handleOpen} >
                        <Avatar sx={{ width: 70, height: 70, backgroundColor: "midnightblue" }}
                            src={profile}
                    onClick={uploadProfile}
                    
                    >Google</Avatar>
                    </IconButton>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={style}>
                            <ImageUpload handleClose= {handleClose} />
                        </Box>
                        </Modal>
                    
                    <Typography variant="h4"> Google </Typography>
                    
                    
                </Stack>
                <br/>
                <Card style={{ width: 500 }}>
                    <CardContent >
                        <Typography variant='h6'>Contact Information</Typography>
                        <Typography variant='subtitle1'>First Name</Typography>
                        <TextField fullWidth value= {firstName}
                        onChange={e => setFirstName(e.target.value)}
                            id="outlined-basic" label="" variant="outlined" />
                        
                        <Typography variant='subtitle1'>Last Name</Typography>
                        <TextField fullWidth id="outlined-basic" label=""
                            value={lastName} onChange={e => setLastName(e.target.value)}
                        variant="outlined" />
                        
                        <Typography variant='subtitle1'>Role</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={role}
                        onChange={e=>setRole(e.target.value)}
                            variant="outlined"  />
                        
                         <Typography variant='subtitle1'>City</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={city}
                        onChange={e=>setCity(e.target.value)}
                            variant="outlined" />
                        <Typography variant='subtitle1'>State</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={state}
                        onChange={e=>setState(e.target.value)}
                            variant="outlined" />
                        <Typography variant='subtitle1'>Country</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={country}
                        onChange={e=>setCountry(e.target.value)}
                            variant="outlined" />
                    
                        <br /><br />
                        <Stack spacing={2} direction="row">
                            <Button onClick={updateProfile}
                                variant="contained" color='primary'>Save</Button>
                        <Button variant="outlined" color='primary'>Cancel</Button>
                        </Stack>
                    </CardContent>
                </Card>
                <br/><br/>
                      <Card style={{ width: 500 }}>
                    <CardContent >
                        <Typography variant='h6'>Company Details</Typography>
                        <Typography variant='subtitle1'>Website</Typography>
                        <TextField fullWidth value= {webSite}
                        onChange={e => setWebsite(e.target.value)}
                            id="outlined-basic" label="" variant="outlined" />
                        
                        <Typography variant='subtitle1'>Company Size</Typography>
                        <TextField fullWidth  id="outlined-basic" label="" value={companySize} onChange={e => setCompanySize(e.target.value)}
                        variant="outlined" />
                        
                        <Typography variant='subtitle1'>Company Type</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={companyType}
                        onChange={e=>setCompanyType(e.target.value)}
                            variant="outlined"  />
                        
                         <Typography variant='subtitle1'>Revenue</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={revenue}
                        onChange={e=>setRevenue(e.target.value)}
                            variant="outlined" />
                        
                        <Typography variant='subtitle1'>Headquarters</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={headquarters}
                        onChange={e=>setHeadquarters(e.target.value)}
                            variant="outlined" />
                        
                        <Typography variant='subtitle1'>Industry</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={industry}
                        onChange={e=>setIndustry(e.target.value)}
                            variant="outlined" />
                        
                        <Typography variant='subtitle1'>Founded</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={founded}
                        onChange={e=>setFounded(e.target.value)}
                            variant="outlined" />
                        
                        <Typography variant='subtitle1'>Mission</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={mission}
                        onChange={e=>setMission(e.target.value)}
                            variant="outlined" />
                        
                        {/* <Typography variant='subtitle1'>Vision</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={visison}
                        onChange={e=>setVision(e.target.value)}
                            variant="outlined" /> */}
                        
                        <Typography variant='subtitle1'>CEO Name</Typography>
                        <TextField fullWidth id="outlined-basic" label="" value={CEO}
                        onChange={e=>setCEO(e.target.value)}
                            variant="outlined"  />
                        
                        {/* <Link onClick={handleEmailOpen}><Typography variant='body' color='primary'>edit</Typography></Link>
                        <Modal open={emailOpen} onClose={handleEmailClose}>
                            <EmailModal seekerEmail={seekerEmail}/>
                        </Modal> */}
                        
                        <br /><br />
                        <Stack spacing={2} direction="row">
                            <Button onClick={updateCompany}
                                variant="contained" color='primary'>Save</Button>
                        <Button variant="outlined" color='primary'>Cancel</Button>
                        </Stack>
                    </CardContent>
                </Card>
                </Container>
        </div>
    )
}