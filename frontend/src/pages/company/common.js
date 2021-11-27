import React, {useEffect, useState} from "react";
import NavBar from "../../components/user/NavBar";
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Container, Grid, Tab, Tabs } from "@material-ui/core";
import Snapshot from './snapshot';
import JoinUs from "./joinus";
import {Link, useLocation} from "react-router-dom";
import { Box } from "@mui/system";


export default function Common() {
    const [tabValue, setTabValue] = React.useState(0);
    const [tabResult, setTabResult] = React.useState();
    const search = useLocation().search;

    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    
    useEffect(() => {
        const tab = new URLSearchParams(search).get('tab');
        setTabResult(tab);
    }, [search, tabResult])
    
    const TabContent = () => {
        console.log(tabResult)
        if (tabResult === "snapshot") return <Snapshot />
        else if (tabResult === "join") return <JoinUs/>
        // else if (tabResult === "reviews") return </>
        // else if (tabResult === "salary") return </>
        // else if (tabResult === "jobs") return </>
        // else if (tabResult==="benefits") return </>
        //else if (tabResult==="photos") return </> 
        else return <Snapshot/>    
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
                <Tab label="Jobs" to='/common?tab=jobs' component={Link} />
            </Tabs>
            <hr />
            <Box m={10}>
            <TabContent />
            </Box>
        </div>
    )
}



