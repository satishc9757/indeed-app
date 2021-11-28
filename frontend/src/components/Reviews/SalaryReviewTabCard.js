import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import CardContent from '@mui/material/CardContent';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';




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
       
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} justifyContent="center">
        <Grid  xs="4">
        
        <Card sx={{ maxWidth: 500, height:"80%" }} size="small">
            
      <CardContent>
      <Grid container spacing={2} style={{margin:"5px"}}>
      <Grid item xs="6" >
        <Typography variant="h5" component="div" >
          Detailer
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          2 Salaries Reported
        </Typography>
        </Grid>
        <Grid item xs="6" style={{padding:"20px",paddingRight:"45px"}} >
        <Typography variant="body2" style={{float:"right"}}>
         Average Salary
         
          <h1 style={{margin:"0px"}}><b>$135,000</b></h1>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; per year
          
        </Typography>
       
       
        </Grid>
       </Grid>
      </CardContent>
     </Card>
    </Grid>
    <Grid xs="4">
    
    
    
    
    
    
    
    
    
    
     <Card sx={{  maxWidth: 500, height:"80%" }}>
            
            <CardContent>
            <Grid container spacing={2} style={{margin:"5px"}}>
            <Grid item xs="6">
              <Typography variant="h5" component="div">
                Detailer
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                2 Salaries Reported
              </Typography>
              </Grid>
              <Grid item xs="6" style={{padding:"20px",paddingRight:"45px"}}>
              <Typography variant="body2" style={{float:"right"}}>
               Average Salary
               
                <h1 style={{margin:"0px"}}><b>$135,000</b></h1>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; per year
                
              </Typography>
             
             
              </Grid>
             </Grid>
            </CardContent>
           </Card>
          
                </Grid>
                <Grid xs="4">



                </Grid>
                </Grid>
      </Box>
    </div>
    )
}

export default FeaturedReviewCard



