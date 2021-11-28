import { Card, CardContent, Container, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/user/NavBar";

export default function Jobseeker() {
    return (
        <div>
            <NavBar />
            <br/>
            <Container><Card sx={{width:"100%"}}>
                <CardContent>
                    <Typography variant='subtitle1'>First Name</Typography>
                    <TextField fullWidth id="outlined-basic" label="" variant="outlined" />
                    <Typography variant='subtitle1'>Last Name</Typography>
                    <TextField fullWidth id="outlined-basic" label="" variant="outlined" />
                </CardContent>
            </Card></Container>
        </div>
    )
}
