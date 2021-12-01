import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import CardContent from '@mui/material/CardContent';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';




const FeaturedReviewCard = (props) => {
  
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          
        </Box>
      );

    return (
        
        <Card sx={{ maxWidth: 500, height:"80%" }} size="small">
        
      <CardContent>
      <Grid container spacing={2} style={{margin:"5px"}}>
      <Grid item xs="6" >
        <Typography variant="h5" component="div" >
          {props.data.salary_job_title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.data.salary_job_location}
        </Typography>
        </Grid>
        <Grid item xs="6" style={{padding:"20px",paddingRight:"45px"}} >
        <Typography variant="body2" style={{float:"right"}}>
         Average Salary
         
          <h1 style={{margin:"0px"}}><b>{props.data.avg_salary}$</b></h1>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; per year
          
        </Typography>
       
       
        </Grid>
       </Grid>
      </CardContent>
     </Card>
    )
}

export default FeaturedReviewCard



