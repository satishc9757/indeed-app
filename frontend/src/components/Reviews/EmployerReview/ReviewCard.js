import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import CardContent from '@mui/material/CardContent';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';





const ReviewCard = (props) => {
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
    <div >
    <Card sx={{ maxWidth: 600 }}>
    <table>
        
    <td style={{justifyContent:"center"}}>
    <Typography sx={{fontSize:23}} style={{padding:"0px",margin:"0px"}}>
        &nbsp;&nbsp;<b>{props.review.review_company_rating}</b>
        <br />
        <Rating name="read-only" defaultValue={props.review.review_company_rating} precision={0.5} readOnly size="small" style={{color:"#aa4069"}} />
      </Typography>
      
    </td>
    <td>
    <CardContent>
     
      <Typography variant="h5" component="div">
        <b>{props.review.review_title}</b>
      </Typography>
      <Typography sx={{ fontSize:12 }} color="text.secondary">
        Software Engineer Intern (Former Employee)- Santa Clara, CA  - April,2017
      </Typography>
      <Typography variant="body2">
       {props.review.review_content}
        
      </Typography>
      <Typography variant="body2">
      <h5><b>Pros</b></h5>
       {props.review.review_pros}
        
      </Typography>
      <Typography variant="body2">
          <h5><b>Cons</b></h5>
       {props.review.review_cons}
        
      </Typography>
      <Typography variant="body2">
      <h5><b>Prep</b></h5>
       {props.review.review_prep}
        
      </Typography>
      <br />
      <Typography sx={{ fontSize:12 }} color="text.secondary">
        Feature this review?<br />
        <Button variant="contained" size="small" color="inherit" style={{padding:"0px"}} onClick={(e,v)=>props.add_featured_review(props.review.review_id,props.review.review_company_rating)}>
        Add as featured review
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" size="small" color="inherit" style={{padding:"0px"}} disabled>
        Remove as featured review
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

export default ReviewCard



