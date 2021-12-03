import React from 'react'
import SalaryReviewTabCard from './SalaryReviewTabCard'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AutoCompleteSearchBox from './AutoCompleteSearch'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const SalaryReviewsPanel = (props) => {


    var dataobj={
        avg_salary: 17250,
      category: "technology",
      salary_job_location: "San francisco",
      salary_job_title: "software engineer intern"
      }
    var details=[]
    let category_data=props.data



for(const data of category_data) {
    details.push(<Grid xs="6" >
                       
    <SalaryReviewTabCard data={data} />

    

    </Grid>)
  }
    return (
       
            

      <Paper sx={{ maxWidth: 1400, my: 1, mx: 'auto', p: 2 }}>
          
        <Grid container wrap="nowrap" spacing={2} alignItems="center" sx={{border: 0}}>
          
          <Grid item sm zeroMinWidth textAlign="center" border="none" sx={{border: 0}}>
            
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
       
                <Box sx={{ flexGrow: 1 ,border: 0}} style={{border:'none'}} textAlign="left">
                <Typography> <h3><b>Average Salaries for {props.dept} category </b></h3></Typography><br />
                    <Grid container maxWidth="md" sx={{ml:"150px",border: 0}} textAlign="left" spacing={1} justifyContent="left" >
                        {details}
                    </Grid>
                </Box>
            </div>

            
          </Grid>
        </Grid>
      </Paper>


      
    )
}

export default SalaryReviewsPanel
