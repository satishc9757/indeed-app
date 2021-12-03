
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';

import CardContent from '@mui/material/CardContent';

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ReviewUserCard(reviews) {
    console.log(reviews.reviews)
    let reviews2 = reviews.reviews
    return (
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div >

            </div>
            <div >
                <Card sx={{ maxWidth: 600 }}>
                    <table>
        
                        <td style={{ justifyContent: "center" }}>
                            <Typography sx={{ fontSize: 23 }} style={{ padding: "0px", margin: "0px" }}>
                                &nbsp;&nbsp;<b>{reviews2.review_company_rating}</b>
        
                                <Rating name="read-only" value={reviews2.review_company_rating} precision={0.5} readOnly size="small" style={{ color: "#aa4069" }} />
                            </Typography>
      
                        </td>
                        <td>
                            <CardContent>
     
                                <Typography variant="h5" component="div">
                                    <b>{reviews2.review_title}</b>
                                </Typography>
                                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                    Software Engineer Intern (Former Employee)- Santa Clara, CA  - April,2017
                                </Typography>
                                <Typography variant="body2">
                                    {reviews2.review_content}
        
                                </Typography>
                                <Typography variant="body2">
                                    <h5><b>Pros</b></h5>
                                    {reviews2.review_pros}
        
                                </Typography>
                                <Typography variant="body2">
                                    <h5><b>Cons</b></h5>
                                    {reviews2.review_cons}
        
                                </Typography>
                                <Typography variant="body2">
                                    <h5><b>Prep</b></h5>
                                    {reviews2.review_prep}
        
                                </Typography>
                                <br />
                                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                    Was this review helpful? <br />
                                    <Button variant="contained" size="small" color="inherit" style={{ padding: "0px" }}>
                                        Yes
                                    </Button>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button variant="contained" size="small" color="inherit" style={{ padding: "0px" }}>
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
