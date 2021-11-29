import { Avatar, Container, Grid, Paper, Tab, Typography } from "@material-ui/core";
import backendServer from "../../webConfig";
import { useEffect, useState } from "react";
const axios = require('axios');


export default function JoinUs({CompanyDetails}) {
    
    return (
        <Container>
            <Typography
                variant="h4">
                About {CompanyDetails.comp_name}
            </Typography>
            <br/><br/>
            
            <span>{ CompanyDetails.comp_description}</span>
            
            <br/><br/>
        </Container>
    )
}