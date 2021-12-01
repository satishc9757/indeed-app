import { Card, CardContent } from "@material-ui/core";
import {  Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

export default function JobCard({jobDetails}) {

    const oneDay = 24 * 60 * 60 * 1000;
    const currentDate = new Date();
    const jobDate = new Date(jobDetails.job_created_at); //job_created_at should be in mm/dd/yyyy format
    const diffDays = Math.round(Math.abs((currentDate - jobDate) / oneDay));



    return (
        <div>
        <div>{jobDetails.job_title}</div>
        
        <Card
                    // style={selectedStyle}
                    variant="outlined"
                    // onClick={(event) => this.handleJobCardClick(event, index)}
                    >
                    <CardContent>
                        <Typography variant="h5" component="div">
                            <Link to = "/applicants" params={{"jobid":jobDetails._id}}>{jobDetails.job_title}</Link>
                        </Typography>
                        <Typography>
                            {jobDetails.job_company_name} | {jobDetails.job_industry}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {jobDetails.job_location[0].city}, {jobDetails.job_location[0].state}, {jobDetails.job_company_rating || ""} . Remote
                        </Typography>
                        <Typography>
                            Description: {jobDetails.job_what_you_need}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {diffDays}+ days ago
                        </Typography>
                    </CardContent>

                </Card>
        </div>
        
    )

}