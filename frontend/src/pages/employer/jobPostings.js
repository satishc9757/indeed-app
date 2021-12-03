import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from "../../components/user/NavBar";
import { Card, CardContent, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material';
import backendServer from '../../webConfig';
import axios from 'axios';
import CreateJobPostingsModal from './createJobPostingModal';
import { GridList, GridListTile } from '@material-ui/core';
import JobDetails from './jobDetailsPage';

const theme = createTheme();

export default class JobPostings extends React.Component {

   state = {
        limit:2,
        page:1,
        totalpage:1,
        selectedJobIndex : 0,
    //    job_work_type : "Remote",
    //    job_type : "Full-time",
    //    inputErrors: {
    //         fullName:"error"
    //    },
       jobs : [
           {
        job_company_id: "Comp1",
        job_title: "Software Engineer Intern",
        job_company_name: "PWC",
        job_company_image_link: "https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/pwc_bg.jpeg",
        job_industry: "Information Technology",
        job_location: [{
            city: "San Jose",
            street:"7th Street",
            state: "CA",
            country: "USA",
            zipcode: "95126",
        }],
        job_work_type: "Internship",
        job_salary_details: "$50/hour",
        job_compensation: 50,
        job_what_you_do: "As an Intern / Trainee, you'll work as part of a team of problem solvers, helping to solve complex business issues from strategy to execution. PwC Professional skills and responsibilities for this management level.",
        job_what_you_love: "Our team helps multinational clients manage their mobile workforce by developing effective expatriate management solutions. You’ll be assisting our team manage business processes through expatriate software implementation, systems redesign and integration with enterprise Human Resources/Payroll solutions such as PeopleSoft, Workday, SAP and Human Resources Access.",
        job_what_you_need: "Understanding of advanced programming concepts and object oriented design patterns, emphasizing data structures and algorithms.",
        job_created_at: "11/12/2021"
    }, {
        job_company_id: "Comp1",
        job_title: "Summer Analyst",
        job_company_name: "PWC",
        job_company_image_link: "https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/pwc_bg.jpeg",
        job_industry: "Information Technology",
        job_location: [{
            city: "San Jose",
            street:"7th Street",
            state: "CA",
            country: "USA",
            zipcode: "95126",
        }],
        job_work_type: "Internship",
        job_salary_details: "$50/hour",
        job_compensation: 50,
        job_what_you_do: "As an Intern / Trainee, you'll work as part of a team of problem solvers, helping to solve complex business issues from strategy to execution. PwC Professional skills and responsibilities for this management level.",
        job_what_you_love: "Our team helps multinational clients manage their mobile workforce by developing effective expatriate management solutions. You’ll be assisting our team manage business processes through expatriate software implementation, systems redesign and integration with enterprise Human Resources/Payroll solutions such as PeopleSoft, Workday, SAP and Human Resources Access.",
        job_what_you_need: "Understanding of advanced programming concepts and object oriented design patterns, emphasizing data structures and algorithms.",
        job_created_at: "11/01/2021"
    }
    ],
   }

   onPageChange = async(e, val)=>{
    await this.setState({
        page: val
    })
    await this.onFetch();
}

onChange = async(e)=>{
    await this.setState({
        [e.target.name]: e.target.value
    });
}

onSelect = async(e)=>{
    await this.setState({
        limit: e.target.value
    });
    await this.onFetch();
}

onFetch = async(e)=>{
    let job_company_id = sessionStorage.getItem("emp_company_id");
    const response = await axios.get(`${backendServer}/company/jobsByPages?compId=${job_company_id}&page=${this.state.page}&limit=${this.state.limit}`);
    console.log("jobs data : "+JSON.stringify(response.data));
    await this.setState({
        jobs: response.data.jobPostings,
        totalpage: Number(response.data.totalPages),
        page: Number(response.data.currentPage)
    });

}

handleJobCardClick = (event, jobIndex) => {
    // this.setState({currentJob: this.state.jobs[jobIndex]});
    // console.log(event);
    // event.target.classList.add("light-grey-background");
    this.setState({selectedJobIndex: jobIndex});
}

  handleSubmit = async (data) => {
    // event.preventDefault();
    //const data = new FormData(event.currentTarget);
    // const data = this.state;
    // eslint-disable-next-line no-console
    console.log("recvd data "+JSON.stringify(data));
    const job_company_id = sessionStorage.getItem("emp_company_id");
    const job_company_name = "Adobe" // to be fetched from cookie
    // const payload = {
    //     job_company_id : job_company_id,
    //     job_title: data.job_title,
    //     job_company_name: job_company_name,
    //     job_industry: data.job_industry,
    //     job_location: {
    //         city: data.job_city,
    //         street: data.job_street,
    //         state: data.job_state,
    //         country: data.job_country,
    //         zipcode: data.job_zipcode,
    //     },
    //     job_work_type: data.job_work_type,
    //     job_salary_details: data.job_salary_details,
    //     job_compensation: data.job_compensation,
    //     job_what_you_do: data.job_what_you_do,
    //     job_what_you_love: data.job_what_you_love,
    //     job_what_you_need: data.job_what_you_need,
    //     // job_company_rating: data.job_company_rating,
    // }

    let payload = {...data,  job_company_id : job_company_id, job_company_name: job_company_name};
    console.log("payload : "+JSON.stringify(payload));
    var response = await axios.post(`${backendServer}/employer/job`, payload);
    console.log("response: "+JSON.stringify(response.data));
    // await this.setState({jobSaved: true})

  };


  renderJobCard = (job, index) => {
    // const oneDay = 24 * 60 * 60 * 1000;
    // const currentDate = new Date();
    // const jobDate = new Date(job.job_created_at); //job_created_at should be in mm/dd/yyyy format
    // const diffDays = Math.round(Math.abs((currentDate - jobDate) / oneDay));
    const selectedStyle = (this.state.selectedJobIndex == index) ? {backgroundColor:"lightgrey", borderLeftColor:"#2557a7", borderLeftWidth: "thick"} : null;


    return(
        <div >
            <Card
                style={selectedStyle}
                variant="outlined"
                onClick={(event) => this.handleJobCardClick(event, index)}
                >
                <CardContent>
                <Typography variant="h5" component="div">
                        {job.job_title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {job.job_location[0].city}, {job.job_location[0].state}
                    </Typography>
                    <Typography> {job.job_type}, {job.job_work_type}</Typography>
                        <p>{job.job_location.length}+ locations</p>
                    <Typography>Compensation: {job.job_salary_details}</Typography>
                    <Typography>Description: {job.job_what_you_need}</Typography>
                    <Typography>Posted on <i>{job.job_created_at}</i></Typography>
                </CardContent>

            </Card>
        </div>
    );
}


  async componentDidMount(){
    let job_company_id = 1;
    console.log("called from browser")
    const response = await axios.get(`${backendServer}/company/jobsByPages?compId=${job_company_id}&page=${this.state.page}&limit=${this.state.limit}`);
    console.log("jobs data : "+JSON.stringify(response.data));
    await this.setState({
        jobs: response.data.jobPostings,
        totalpage: Number(response.data.totalPages),
        page: Number(response.data.currentPage)
    });
  }

//   renderJobCard = (job, index) => {
//     // const oneDay = 24 * 60 * 60 * 1000;
//     // const currentDate = new Date();
//     // const jobDate = new Date(job.job_created_at); //job_created_at should be in mm/dd/yyyy format
//     // const diffDays = Math.round(Math.abs((currentDate - jobDate) / oneDay));
//     // const selectedStyle = (this.state.selectedJobIndex == index) ? {backgroundColor:"lightgrey", borderLeftColor:"#2557a7", borderLeftWidth: "thick"} : null;


//     return(
//         <div >
//             {/* <Grid item xs={2} sm={4} md={4} key={index}> */}
//             {/* <GridListTile key={index}> */}
//             <div className="col-md-3">
//             <Card
//                 variant="outlined"
//                 onClick={(event) => this.handleJobCardClick(event, index)}
//                 >
//                 <CardContent>
//                     <Typography variant="h5" component="div">
//                         {job.job_title}
//                     </Typography>
//                     <Typography sx={{ mb: 1.5 }} color="text.secondary">
//                         {job.job_location[0].city}, {job.job_location[0].state}
//                     </Typography>
//                     <Typography> {job.job_type}, {job.job_work_type}</Typography>
//                         <p>{job.job_location.length}+ locations</p>
//                     <Typography>Compensation: {job.job_salary_details}</Typography>
//                     <Typography>Description: {job.job_what_you_need}</Typography>
//                     <Typography>Posted on <i>{job.job_created_at}</i></Typography>
//                 </CardContent>

//             </Card>
//             </div>
//             {/* </GridListTile> */}
//         </div>
//     );
// }

  render(){


        return (
            <div >
            <NavBar />

            {/* <ThemeProvider theme={theme}> */}
                {/* SEARCH PANEL */}
                <Grid container spacing={2} style={{'margin':'2%'}}>
                    <Grid item sm={2}/>
                    <Grid item sm={3}>
                    <Typography
                        variant="h4">
                        Jobs Posted
                    </Typography>
                    </Grid>
                    <Grid item sm={3}>

                    </Grid>
                    <Grid item sm={3}>
                        <CreateJobPostingsModal handleSubmit={this.handleSubmit}/>
                    </Grid>
                </Grid>

                <br/><br/>
                {/* JOBS CARDS */}
                {/* <Container >

                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <GridList spacing={4} cols={3}  style={{overflowY: 'none'}} >
                        {this.state.jobs.map(this.renderJobCard)}
                    </GridList>
                    <div className="container-fluid">
                        <div className="row">
                            {this.state.jobs.map(this.renderJobCard)}
                        </div>
                    </div>

                </Container> */}

                {/* JOBS PANEL */}
                <Container>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <Stack spacing={2}>
                            {this.state.jobs.map(this.renderJobCard)}
                        </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            {this.state.jobs ? <JobDetails job={this.state.jobs[this.state.selectedJobIndex]}/> : "No data"}
                        </Grid>
                    </Grid>
                </Container>

                {/* PAGINATION         */}
                <Container style={{marginBottom: "31px"}}>
                <Grid container spacing={2}>
                        <Grid item xs={1}>
                        <InputLabel id="page-select-label">Page Size</InputLabel>
                        </Grid>
                        <Grid item xs={2}>
                            <Select id="page-select"
                                defaultValue={1}
                                label="page-select-label"
                                onChange={this.onSelect} >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </Grid>
                </Grid>


                    <Pagination count={this.state.totalpage} page={this.state.page} onChange={this.onPageChange} />
                </Container>
            {/* </ThemeProvider> */}
            </div>
            )
        }
}