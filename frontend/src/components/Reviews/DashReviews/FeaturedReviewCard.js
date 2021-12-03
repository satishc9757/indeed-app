import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import axios from 'axios'
import CardContent from '@mui/material/CardContent';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import {useState} from 'react'



const FeaturedReviewCard = (props) => {
  
  const [update,setupdated]=useState(false)
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      
    </Box>
  );
async function update_helpful(helpful,not_helpful){
    let data={
      helpful:helpful,
      not_helpful:not_helpful,
      review_company_id:props.review.review_company_id,
      review_id:props.review.review_id
    }

    axios.defaults.headers.common.authorization = await localStorage.getItem("token");
    axios.post(process.env.REACT_APP_BACKEND+"api/company/voteReview",data).then(response=>{
                
        if(response.status === 200)
        {
         
          console.log("updated successfully");
       
        }
        else if(response.status === 202)
        {
          console.log("faced some issue");
        }

})

}
return (
    <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div className="col-sm">

    </div>
    <div className="col-sm-3">
    <Card sx={{ maxWidth: 600 }}>
    <table>
        
    <td style={{justifyContent:"center"}}>
    <Typography sx={{fontSize:23}} style={{padding:"0px",margin:"0px"}}>
        &nbsp;&nbsp;<b>{props.review.review_company_rating}</b>
        <br />
        <Rating name="read-only" value={props.review.review_company_rating}  precision={0.5} readOnly size="small" style={{color:"#aa4069"}} />
      </Typography>
      
    </td>
    <td>
    <CardContent>
     
      <Typography variant="h5" component="div">
        <b>{props.review.review_title}</b>
      </Typography>
      <Typography sx={{ fontSize:12 }} color="text.secondary">
      {props.review.review_date.split('T')[0]}
      </Typography>
      <Typography variant="body2" color="#007aff" style={{background:"#eef1fe"}}>
        
        <p style={{margin:"0px",color:"#164081",padding:"0px"}}><b style={{color:"#164081"}}>Indeed Featured review</b></p>
        <p style={{margin:"0px",color:"#164081",padding:"0px"}}>The most useful review selected by Indeed</p>
        
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
        Was this review helpful? <br />
        <Button variant="contained" size="small" disabled={update==true || ! props.btn ?true:false} color="inherit" style={{padding:"0px"}} onClick={()=>{setupdated(true);props.review.found_helpful=props.review.found_helpful+1;update_helpful(1,0)}}>
             Yes-{props.review.found_helpful}
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" size="small" color="inherit" disabled={update==true || !props.btn?true:false} style={{padding:"0px"}} onClick={()=>{setupdated(true);props.review.found_not_helpful=props.review.found_not_helpful+1;update_helpful(0,1)}}>
             No-{props.review.found_not_helpful}
        </Button>
        
      </Typography>
      <br />
      <Typography sx={{ fontSize:12 }} color="text.secondary">
          Feature this review?<br />
        <Button variant="contained" size="small" color="inherit" style={{padding:"0px"}} disabled>
            Add as featured review
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant="contained" size="small" color="inherit" style={{padding:"0px"}}  disabled={props.btn}  onClick={()=>{props.remove_featured_review(props.review.review_id,props.review.review_company_rating)}}>
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

export default FeaturedReviewCard



