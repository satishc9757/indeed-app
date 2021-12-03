import { Avatar, Container, Grid, Paper, Tab, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Stack } from "@mui/material";
import Common from "./common";
// import dp  from "../../media/girl-avatar.png"
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import backendServer from "../../webConfig";
import ReviewTab from "../../components/Reviews/DashReviews/ReviewTab"
import { useEffect, useState } from "react";
const axios = require('axios');

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    height: 100,
    width: 148,
    elevation: 0,
    margin: 10,
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "center",
    
}));



export default function Snapshot({CompanyDetails},{featuredReviews}) {
    console.log(CompanyDetails)
    console.log(featuredReviews)
    return (
        <Container>
            <Typography
                variant="h4">
                Work Happiness
            </Typography>
            <Typography variant="body1">Scores based on about 890 responses to Indeed's survey on work happiness</Typography>
            <br/>
            <Grid

                container spacing={2}>
                <Grid item xs={4} >
                    <Stack direction="row" spacing={2}>
                        <Avatar variant="rounded"
                    >
                        {CompanyDetails.comp_work_happiness}
                        {/* {Score} */}
                        </Avatar>
                        <div>
                            <Typography variant="h6">Work Happiness Score</Typography>
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={4} >
                    <Stack direction="row" spacing={2}>
                        <Avatar variant="rounded"
                    >
                        {CompanyDetails.comp_learning}
                        {/* {Score} */}
                        </Avatar>
                        <div>
                            <Typography variant="h6">Learning</Typography>
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={4} >
                    <Stack direction="row" spacing={2}>
                        <Avatar variant="rounded"
                    >
                        {CompanyDetails.comp_appreciation}
                        {/* {Score} */}
                        </Avatar>
                        <div>
                            <Typography variant="h6">Appreciation</Typography>
                        </div>
                    </Stack>
                </Grid> 
            </Grid>
            <br/><br/>
            <Typography
                variant="h4">
                About the company
            </Typography>
            <br/>
            <Grid container>
                <Grid item xs={2}>
                    <img
                        
                        width="150"
                        height="200"

                        src={CompanyDetails.comp_profile_location}
                        alt="dp"></img>

                </Grid>
                <Grid item xs={9}>
                    <Stack spacing={8} direction="row">
                        <Box sx={{display: 'flex'}}>
                            <div ><Item>
                                <Typography variant='h6' >CEO</Typography>
                                <Typography >{CompanyDetails.comp_ceo}</Typography>
                            </Item></div>
                            <div ><Item>
                                <Typography variant='h6'>Founded</Typography>
                                <Typography >{CompanyDetails.comp_founded}</Typography>
                            </Item></div>
                            <div ><Item>
                                <Typography variant='h6'>Company Size</Typography>
                                <Typography >{CompanyDetails.comp_size}</Typography>
                            </Item></div>
                            <div ><Item>
                                <Typography variant='h6' >Revenue</Typography>
                                {/* <Typography variant='caption'>more than</Typography> */}
                                <Typography >{CompanyDetails.comp_revenue}</Typography>
                            </Item></div>
                        </Box>
                    </Stack>
                    {/* <Box sx={{display: 'flex'}}>
                        <div ><Item>
                            <Typography variant='h6'>Industry</Typography>
                            <Typography >{CompanyDetails.comp_ceo}</Typography>
                        </Item></div>
                    </Box> */}
                    
                </Grid>
            </Grid>
            <Container>
                <span>{CompanyDetails.comp_description}</span>
            </Container>
            <br/><br/>
            {/* <Typography
                variant="h4">
                Jobs near you
            </Typography>
            <Typography variant="body">
                You're seeing {CompanyDetails.comp_name} jobs close to <b>San Jose, CA.</b>
            </Typography>
            <br/><br/> */}
            <Typography
                variant="h4">
                Reviews
            </Typography>
            <Container>
                <ReviewTab />
                </Container>
        </Container>
        
    )
    
}
