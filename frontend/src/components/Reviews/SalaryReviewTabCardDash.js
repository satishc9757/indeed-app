import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import {Link} from 'react-router-dom'


const SalaryReviewTabCard = () => {

    const theme = useTheme();

    return (
        
        <Card sx={{ display: 'flex' }} >

<CardMedia
        component="img"
        sx={{ width: 51 }}
        image="https://www.apple.com/ac/structured-data/images/open_graph_logo.png?202110180743"
        alt="Live from space album cover"
      />
     
        <CardContent style={{padding:"0px"}} >
        <table> <td>
        <Typography component="div" >
        Apple
        </Typography>
          <Typography component="div" style={{fontSize:"17px"}}>
          5 &nbsp;&nbsp;
       <Rating name="read-only" value={5} readOnly size="" style={{color:"black",fontSize:"1rem"}} />
            <div style={{fontSize:"12px"}}>
                 10366 Reviews
            </div>
          </Typography>
          </td > 
          <td>
          
          </td>
          </table>
        </CardContent>
       
      
    </Card>
    )
}

export default SalaryReviewTabCard
