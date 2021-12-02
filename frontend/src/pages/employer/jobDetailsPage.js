import React, { Component } from 'react'
import {connect} from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, Link } from '@material-ui/core';
import { Box } from '@mui/system';
import { spacing } from '@mui/system';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid, Rating } from '@mui/material';

class JobDetailsPage extends Component {

    state = {
        job_company_id: "Comp1",
        job_title: "Software Engineer Intern",
        job_company_name: "PWC",
        job_company_image_link: "https://uber-eats-store-0144.s3.us-east-2.amazonaws.com/images/others/pwc_bg.jpeg",
        job_industry: "Information Technology",
        job_location: {
            city: "San Jose",
            street:"7th Street",
            state: "CA",
            country: "USA",
            zipcode: "95126",
        },
        job_work_type: "Internship",
        job_salary_details: "$50/hour",
        job_compensation: 50,
        job_what_you_do: "As an Intern / Trainee, you'll work as part of a team of problem solvers, helping to solve complex business issues from strategy to execution. PwC Professional skills and responsibilities for this management level.",
        job_what_you_love: "Our team helps multinational clients manage their mobile workforce by developing effective expatriate management solutions. You’ll be assisting our team manage business processes through expatriate software implementation, systems redesign and integration with enterprise Human Resources/Payroll solutions such as PeopleSoft, Workday, SAP and Human Resources Access.",
        job_what_you_need: "Understanding of advanced programming concepts and object oriented design patterns, emphasizing data structures and algorithms.",
        job_reviews: 8138,
        jobSaved: false,
        company_avg_rating: 4.3
    }

    render() {
        const borderStyle = {borderTopColor:"#2557a7", borderTopWidth: "thick"};

        return (
            <Card sx={{ maxWidth: 345 }}
                    variant="outlined"
                    style={borderStyle}>
            {/* <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={this.state.job_company_image_link}
            /> */}

            <CardContent>
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
                        {this.props.job.job_company_name}
                    </Grid>
                    {/* <Grid item xs={5}>
                        <Link>{this.props.job.job_reviews} reviews</Link>
                    </Grid> */}
                </Grid>



                <Typography variant="body2" color="text.secondary">
                    {this.props.job.job_location[0].city}, {this.props.job.job_location[0].state} {this.props.job.job_location.zipcode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {this.props.job.job_work_type}
                </Typography>
            </CardContent>
            <CardActions>
                {/* <Button variant="contained">Apply</Button> */}
            </CardActions>

            <CardContent>

                <Typography gutterBottom variant="h6" component="div">
                    <b>Qualifications</b>
                </Typography>
                <Typography paragraph>
                    {this.props.job.job_what_you_need}
                </Typography>

                <Typography gutterBottom variant="h6" component="div">
                    <b>Responsibilities</b>
                </Typography>
                <Typography paragraph>
                    {this.props.job.job_what_you_do}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                    <b>What you would love</b>
                </Typography>
                <Typography paragraph>
                    {this.props.job.job_what_you_love}
                </Typography>

            </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(JobDetailsPage)
