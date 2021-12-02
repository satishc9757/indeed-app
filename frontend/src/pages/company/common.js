import React, {useEffect, useState} from "react";
import NavBar from "../../components/user/NavBar";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Container, Grid, Tab, Tabs } from "@material-ui/core";
import Snapshot from './snapshot';
import JoinUs from "./joinus";
import Jobs from "./jobs/jobs";
import JobPosted from "./jobs/jobPosted";
import {Link, useLocation} from "react-router-dom";
import { Box } from "@mui/system";
import backendServer from "../../webConfig";
import Photos from "../../components/company/Photos";
const axios = require('axios');

export default function Common() {
    const [tabValue, setTabValue] = React.useState(0);
    const [tabResult, setTabResult] = React.useState('snapshot');
    const [companyDetails, setCompanyDetails] = useState('')
    const search = useLocation().search;


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    useEffect(() => {
        const tab = new URLSearchParams(search).get('tab');
        setTabResult(tab);
        let Company_ID = 3;
        axios.get(`${backendServer}/company/companyDetails?compId=${Company_ID}`)
            .then(response => {
                console.log(JSON.stringify(response.data[0])+"-----");
                setCompanyDetails(response.data[0])
            }).catch=(error) => {
                console.log(error)
            }
    }, [search])

    
    const TabContent = () => {
        console.log(tabResult)
        if (tabResult === "snapshot") return <Snapshot CompanyDetails={companyDetails} />
        else if (tabResult === "join") return <JoinUs CompanyDetails={companyDetails} />
        // else if (tabResult === "reviews") return </>
        // else if (tabResult === "salary") return </>
        else if (tabResult === "jobs") return <Jobs/>
        else if (tabResult === "applicants" && sessionStorage.getItem("user-type")==="employer") return <JobPosted/>
        // else if (tabResult==="benefits") return </>
        else if (tabResult==="photos") return <Photos/>
        else return <Snapshot CompanyDetails={companyDetails} />
        }


    return (
        <div
            sx={{ margin: 50 }}>
            <NavBar />
            <br />
            <Grid container spacing={2}>
                <Grid item>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            marginLeft: 4
                        }}
                        variant="rounded"
                    // src="/static/images/avatar/1.jpg"
                    />

                </Grid>
                <Grid item>
                    <Typography
                        variant="h5">Company Name</Typography>
                </Grid>
            </Grid>
            <br />
            <Tabs value={tabValue}
                indicatorColor="primary"
                centered
                onChange={handleTabChange}
            >
                <Tab label="Snapshot" to='/common?tab=snapshot' component={Link}/>
                <Tab label="Why Join Us" to='/common?tab=join' component={Link} />
                <Tab label="Reviews" to='/common?tab=reviews' component={Link} />
                <Tab label="Salaries" to='/common?tab=salaries' component={Link}/>
                <Tab label="Benefits" to='/common?tab=benefits' component={Link}/>
                <Tab label="Photos" to='/common?tab=photos' component={Link} />
                {sessionStorage.getItem("user-type")==="employer" && 
                <Tab label="Applicants" to='/common?tab=applicants' component={Link} />}
                <Tab label="Jobs" to='/common?tab=jobs' component={Link} />
            </Tabs>
            <hr />
            <Box m={10}>{companyDetails !== "" ? <TabContent /> : null}</Box>
        </div>
    )
}
