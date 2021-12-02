import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import CardContent from '@mui/material/CardContent';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';





const FeaturedReviewCard = () => {

    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          
        </Box>
      );

    return (
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div className="col-sm">

        </div>
        <div className="col-sm-3">
        <Card sx={{ maxWidth: 600 }}>
        <table>
            
        <td style={{justifyContent:"center"}}>
        <Typography sx={{fontSize:23}} style={{padding:"0px",margin:"0px"}}>
            &nbsp;&nbsp;<b>5.0</b>
            
            <Rating name="read-only" value={5} readOnly size="small" style={{color:"#aa4069"}} />
          </Typography>
          
        </td>
        <td>
        <CardContent>
         
          <Typography variant="h5" component="div">
            <b>Internship at Keysight</b>
          </Typography>
          <Typography sx={{ fontSize:12 }} color="text.secondary">
            Software Engineer Intern (Former Employee)- Santa Clara, CA  - April,2017
          </Typography>
          <Typography variant="body2" color="#007aff" style={{background:"#eef1fe"}}>
            
            <p style={{margin:"0px",color:"#164081",padding:"0px"}}><b style={{color:"#164081"}}>Indeed Featured review</b></p>
            <p style={{margin:"0px",color:"#164081",padding:"0px"}}>The most useful review selected by Indeed</p>
            
          </Typography>
          <Typography variant="body2">
            Good mentor system for intern. Flexible time and good chance to learn.
            The technology mainly focus on commercial software. I like the culture and the support system for intern
            
          </Typography>
          <br />
          <Typography sx={{ fontSize:12 }} color="text.secondary">
            Was this review helpful? <br />
            <Button variant="contained" size="small" color="inherit" style={{padding:"0px"}}>
                 Yes
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="contained" size="small" color="inherit" style={{padding:"0px"}}>
                 No
            </Button>
            
          </Typography>
          
        </CardContent>
       
        </td></ table>
      </Card>
      </div>

       <div className="col-sm">



      </div>
      </div>
    )
}

export default FeaturedReviewCard



