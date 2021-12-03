import React, { Component } from 'react'
import {connect} from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Dialog } from '@mui/material';
import Typography from '@mui/material/Typography';
import { IconButton, Link } from '@material-ui/core';
// import {Link} from 'react-router-dom';
import Common from '../../pages/company/common';
import { Box } from '@mui/system';
import { spacing } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, Rating } from '@mui/material';
import backendServer from '../../webConfig';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import UploadCoverLetter from '../../components/landingpage/uploadCoverLetter'

class JobDetailsCard extends Component {

    state = {
        // _id:"619c40485cc9d329b4f41e3d",
        // job_company_id: "Comp1",
        // job_title: "Software Engineer Intern",
        // job_company_name: "PWC",
        // job_company_image_link: "https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/pwc_bg.jpeg",
        // job_industry: "Information Technology",
        // job_location: {
        //     city: "San Jose",
        //     street:"7th Street",
        //     state: "CA",
        //     country: "USA",
        //     zipcode: "95126",
        // },
        // job_work_type: "Internship",
        // job_salary_details: "$50/hour",
        // job_compensation: 50,
        // job_what_you_do: "As an Intern / Trainee, you'll work as part of a team of problem solvers, helping to solve complex business issues from strategy to execution. PwC Professional skills and responsibilities for this management level.",
        // job_what_you_love: "Our team helps multinational clients manage their mobile workforce by developing effective expatriate management solutions. You’ll be assisting our team manage business processes through expatriate software implementation, systems redesign and integration with enterprise Human Resources/Payroll solutions such as PeopleSoft, Workday, SAP and Human Resources Access.",
        // job_what_you_need: "Understanding of advanced programming concepts and object oriented design patterns, emphasizing data structures and algorithms.",
        // job_reviews: 8138,
        // jobSaved: false,
        // companyAvgRating: 4.3,
        appliedForJob: false,
        openLogin: false,
        openCoverLetterModal: false
    }

    handleSaveAction = async () => {
       //const backendServer = "http://localhost:8000/api"//just for local testing

       if(!this.state.jobSaved){
            const jobSeekerId = "61a081696d73d01739a267ef" // should be fecthed from cookie or session
            let payload = {jobId: this.state._id};
            axios.defaults.headers.common.authorization = await localStorage.getItem("token");
            var response = await axios.post(`${backendServer}/jobseeker/jobs?jobSeekerId=${jobSeekerId}`, payload);
            console.log("response: "+JSON.stringify(response.data));
            await this.setState({jobSaved: true})
        }

    }

    handleUndoAction = () => {
        if(this.state.jobSaved){
            this.setState({jobSaved: false})
        }

    }

    handleApplyJob = async () => {
        const job_seeker_id =  sessionStorage.getItem("job-seeker-id");//FETCH from session!!!
        // const job_seeker_name = ""; //FETCH from session!!!
        // const job_seeker_email = ""; //FETCH from session!!!
        // const job_seeker_street = "";
        // const job_seeker_city = "";
        // const job_seeker_state = "";
        // const job_seeker_country = "";
        // const job_seeker_zipcode = "";
        // const job_seeker_gender = "";
        // const job_seeker_cover_letter_link = "";
        // const job_seeker_resume_link = "";
        if(job_seeker_id && this.props.profileData){

            this.setState({openCoverLetterModal: true});
        } else {
            console.log("hostory push "+JSON.stringify(this.props));
            this.setState({openLogin: true});
            // this.setState({openCoverLetterModal: true});

        }


    }

    createApplication = async (coverletterLocation) => {
        console.log("cover letter : "+coverletterLocation);
        console.log("from props : "+JSON.stringify(this.props.profileData));
        const job_seeker_id =  sessionStorage.getItem("job-seeker-id");
        const job_seeker_email =  sessionStorage.getItem("user-email");
        const payload = {
            app_job_id: this.props.job._id,
            app_job_seeker_id: job_seeker_id,
            app_name: this.props.profileData.seeker_name,
            app_email: job_seeker_email,
            //app_gender: this.props.profileData.seeker_name,
            app_street: this.props.profileData.seeker_name,
            app_city: this.props.profileData.seeker_city,
            app_state: this.props.profileData.seeker_state,
            //app_zipcode: this.props.profileData.seeker_name,
            app_country: this.props.profileData.seeker_country,
            app_resume_link: this.props.profileData.seeker_resume_location,
            app_cover_letter_link: coverletterLocation
        }

        console.log("payload : "+JSON.stringify(payload));
        var response = await axios.post(`${backendServer}/jobseeker/application`, payload);
        console.log("response: "+JSON.stringify(response.data));
        if(response.status === 200){
            this.setState({appliedForJob: true});
        }
    }

    closeCoverLetterModal = () => {
        this.setState({openCoverLetterModal: false});
    }

    closeLoginModal = () => {
        this.setState({openLogin: false});
    }

    loginModal = () => {
        return (
            <Dialog open={this.state.openLogin} onClose={this.closeLoginModal}>
            {/* <DialogTitle style={{textAlign:"center"}}>New Job Posting</DialogTitle> */}
            <DialogContent>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Please login first. <Link href="/login">Login</Link>
                </Typography>
            </DialogContent>
            <DialogActions>
                    <Button onClick={this.closeLoginModal}>Cancel</Button>
            </DialogActions>
            </Dialog>)
    }

    render() {

        const applyButton = this.state.appliedForJob ? <Button  disabled variant="contained">Applied</Button> :  <Button onClick={this.handleApplyJob} variant="contained">Apply</Button>
        const favIcon = this.state.jobSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />;
        const undoButton = this.state.jobSaved ? <Button onClick={this.handleUndoAction}>Undo</Button> : null;

        return (

            <Card sx={{ maxWidth: 545, maxHeight:545 }} display='flex' style={{overflow: "scroll"}}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={this.state.job_company_image_link}
            />

            <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                {this.props.job.job_title}
                </Typography>
                {/* <Box display="flex" spacing={4}>
                    <Link sx={{ml: "2rem"}}>{this.state.job_company_name}</Link>
                    <Typography variant="body2" sx={{ml: "2rem"}} color="text.secondary">4.3</Typography>
                    <Link sx={{m: "2rem"}}>{this.state.job_company_name}</Link>
                </Box> */}

                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Link href="/common" onClick={()=>{sessionStorage.setItem("comp_id",this.props.job.job_company_id);sessionStorage.setItem("comp_name",this.props.job.job_company_name)}} >{this.props.job.job_company_name}</Link>
                    </Grid>
                    <Grid item xs={4}>
                        <Rating name="read-only"
                                value={this.props.job.job_company_rating}
                                size="small"
                                defaultValue={2.5} precision={0.5}
                                readOnly />
                    </Grid>
                    <Grid item xs={5}>
                        <Link>{this.state.job_reviews} reviews</Link>
                    </Grid>
                </Grid>

                <Typography variant="body2" color="text.secondary">
                    {this.props.job.job_location[0].city}, {this.props.job.job_location[0].state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {this.props.job.job_work_type}
                </Typography>
            </CardContent>
            <CardActions>
                {applyButton}
                <Button onClick={this.handleSaveAction} variant="contained" color="grey">
                    {favIcon}
                </Button>
                {/* <Button startIcon={<FavoriteBorderIcon />} size="small" variant="contained"></Button> */}
                {/* <IconButton >
                    <FavoriteBorderIcon />
                </IconButton> */}
                {undoButton}
            </CardActions>

            <CardContent>
                <Box  borderBottom={1} color="lightgrey"></Box>

                    <Typography gutterBottom variant="h6" component="div">
                        Job Details
                    </Typography>
                    <Typography paragraph>
                        Salary Details: {this.props.job.job_salary_details}
                    </Typography>

                    <Typography paragraph>
                        Job Type:  {this.state.job_work_type}
                    </Typography>
                <Box  borderBottom={1} color="lightgrey"></Box>

                <Typography gutterBottom variant="h6" component="div">
                    Full Job Description
                </Typography>
                <Typography paragraph>
                        Department:  {this.props.job.department}
                </Typography>
                <Typography paragraph>
                        Job Location:  {this.props.job.job_location[0].city}, {this.props.job.job_location[0].state}, {this.props.job.job_location[0].country}, {this.props.job.job_location[0].zipcode}
                </Typography>
                <Typography paragraph>
                        Compensation:  {this.props.job.job_compensation}
                </Typography>


                <Typography paragraph>
                    {this.props.job.job_what_you_do}
                </Typography>
                <Typography paragraph>
                    {this.props.job.job_what_you_love}
                </Typography>
                <Typography paragraph>
                    {this.props.job.job_what_you_need}
                </Typography>

            </CardContent>

                {this.loginModal()}
                <UploadCoverLetter openCoverLetterModal={this.state.openCoverLetterModal}
                                    closeCoverLetterModal={this.closeCoverLetterModal}
                                    createApplication={this.createApplication}/>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(JobDetailsCard)
