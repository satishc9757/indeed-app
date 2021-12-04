import React, {useEffect, useState} from "react";
import NavBar from "../../components/user/NavBar";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Container, Grid, Tab, Tabs } from "@material-ui/core";
import Snapshot from './snapshot';
import JoinUs from "./joinus";
import Jobs from "./jobs/jobs";
import ReviewsTab from '../../components/Reviews/DashReviews/ReviewTab'
import SalaryTab from '../../components/Reviews/SalaryReviews/SalayReviewsTab'
import JobPosted from "../employer/jobPosted";
import {Link, useLocation} from "react-router-dom";
import { Box } from "@mui/system";
import backendServer from "../../webConfig";
import Photos from "../../components/company/Photos";
import store from '../../redux/store'
import { SET_SELECTED_COMPANY} from '../../redux/types'

const axios = require('axios');

export default function Common() {
    const [tabValue, setTabValue] = React.useState();
    const [tabResult, setTabResult] = React.useState('snapshot');

    const [companyDetails, setCompanyDetails] = useState('');
    const [featuredReviews, setFeaturedReviews] = useState([]);

    const search = useLocation().search;


    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // useEffect(() => {
    //     const tab = new URLSearchParams(search).get('tab');
    //     setTabResult(tab);
    //     let Company_ID = 3;
    //     axios.get(`${backendServer}/company/companyDetails?compId=${Company_ID}`)
    //         .then(response => {
    //             console.log(JSON.stringify(response.data[0])+"-----");
    //             setCompanyDetails(response.data[0])
    //         }).catch=(error) => {
    //             console.log(error)
    //         }
    // }, [search])


    useEffect( () => {
        
        async function fetchDetails(){
            const tab = new URLSearchParams(search).get('tab');
            

            
            // axios.defaults.headers.common.authorization = await localStorage.getItem("token");

            let Company_ID = sessionStorage.getItem('emp_company_id');
            var response = await axios.get(`${backendServer}/company/companyDetails?compId=${Company_ID}`);

            console.log(JSON.stringify(response.data[0])+"-----");

            store.dispatch({
                type : SET_SELECTED_COMPANY,
                payload : response.data[0]
            })

            await setCompanyDetails(response.data[0])
            await console.log(companyDetails)

            var reviews = await axios.get(`${backendServer}/company/getFeaturedReviews?compId=${Company_ID}`);
            
            await console.log("reviews ", reviews.data);
            for (var idx = 0; idx<reviews.data.length; idx++){
                await featuredReviews.push(reviews.data[idx]);
            }
            // await setFeaturedReviews(reviews.data)
            await console.log(featuredReviews);
            await setTabResult(tab);
        }
        fetchDetails()
            //     }).catch=(error) => {
            //         console.log(error)
            //     }
            // }).catch=(error) => {
            //     console.log(error)
            // }
    }, [search])

    console.log("here are the company details",companyDetails)
    const TabContent = () => {
        console.log(tabResult)
        if (tabResult === "snapshot") return <Snapshot CompanyDetails={companyDetails} featuredReviews={featuredReviews} />
        else if (tabResult === "join") return <JoinUs CompanyDetails={companyDetails} />
        else if (tabResult === "reviews") return <ReviewsTab CompanyDetails={companyDetails} />
        else if (tabResult === "salaries") return <SalaryTab CompanyDetails={companyDetails}/>
        else if (tabResult === "jobs") return <Jobs/>
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
                        src={companyDetails.comp_profile_location}
                    />

                </Grid>
                <Grid item>
                    <Typography
                        variant="h5">{companyDetails.comp_name}</Typography>
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
                {/* <Tab label="Benefits" to='/common?tab=benefits' component={Link}/> */}
                <Tab label="Photos" to='/common?tab=photos' component={Link} />
                <Tab label="Jobs" to='/common?tab=jobs' component={Link} />
            </Tabs>
            <hr />
            <Box m={10}>{companyDetails !== "" && featuredReviews!==""? <TabContent /> : null}</Box>
        </div>
    )
}
