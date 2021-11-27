import { Avatar, Container, Grid, Paper, Tab, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Stack } from "@mui/material";
import Common from "./common";
// import dp  from "../../media/girl-avatar.png"
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    textAlign: 'center',
    height: 100,
    width: 148,
    elevation: 0,
    margin: 10,
    
    
}));

// const Block = styled(Paper)`
// height:100;
// width:100
// `


export default function Snapshot() {
    return (
        <Container>
            <Typography
                variant="h4">
                Work Happiness
            </Typography>
            <Typography variant="body1">Scores based on about 890 responses to Indeed's survey on work happiness</Typography>
            <br/>
            <Grid

                container spacing={2}>
                <Grid item xs={4} >
                    <Stack direction="row" spacing={2}>
                        <Avatar variant="rounded"
                    >
                        89
                        {/* {Score} */}
                        </Avatar>
                        <div>
                            <Typography variant="h6">Work Happiness Score</Typography>
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={4} >
                    <Stack direction="row" spacing={2}>
                        <Avatar variant="rounded"
                    >
                        89
                        {/* {Score} */}
                        </Avatar>
                        <div>
                            <Typography variant="h6">Work Happiness Score</Typography>
                        </div>
                    </Stack>
                </Grid>
                <Grid item xs={4} >
                    <Stack direction="row" spacing={2}>
                        <Avatar variant="rounded"
                    >
                        89
                        {/* {Score} */}
                        </Avatar>
                        <div>
                            <Typography variant="h6">Work Happiness Score</Typography>
                        </div>
                    </Stack>
                </Grid> 
            </Grid>
            <br/><br/>
            <Typography
                variant="h4">
                About the company
            </Typography>
            <br/>
            <Grid container>
                <Grid item xs={2}>
                    <img
                        
                        width="150"
                        height="200"
                        // src={dp}
                        alt="dp"></img>
                </Grid>
                <Grid item xs={9}>
                    <Stack spacing={8} direction="row">
                        <Box sx={{display: 'flex'}}>
                            <div ><Item>
                                <Typography >CEO</Typography>
                                <Typography >ABC</Typography>
                            </Item></div>
                            <div ><Item>
                                <Typography >Founded</Typography>
                                <Typography >ABC</Typography>
                            </Item></div>
                            <div ><Item>
                                <Typography >Company Size</Typography>
                                <Typography >ABC</Typography>
                            </Item></div>
                            <div ><Item>
                                <Typography >Revenue</Typography>
                                <Typography >ABC</Typography>
                            </Item></div>
                        </Box>
                    </Stack>
                    <Box sx={{display: 'flex'}}>
                        <div ><Item>
                            <Typography >Industry</Typography>
                            <Typography >ABC</Typography>
                        </Item></div>
                    </Box>
                    
                </Grid>
            </Grid>
            <Container>
                <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus lorem aliquam nisi varius dignissim. Proin feugiat cursus urna. Vestibulum id erat vitae purus faucibus maximus. Duis nec nisi tristique, bibendum nunc eu, lacinia velit. Donec et tempor sapien.
                
                Praesent dictum felis ac elit euismod, et sagittis lacus pretium. Aenean ac vulputate nisi. Aliquam auctor magna et luctus congue. Mauris ultrices erat sed eros porttitor finibus. Quisque fermentum lacus ac posuere aliquet. Nam a neque ut erat euismod scelerisque. Etiam elementum turpis pharetra massa mattis dignissim. Etiam sed ullamcorper est. Aliquam nibh tellus, sagittis eget est sit amet, lacinia placerat velit.</span>
            </Container>
            <br/><br/>
            <Typography
                variant="h4">
                Jobs near you
            </Typography>
            <Typography variant="body">
                You're seeing Google jobs close to <b>San Jose, CA.</b>
            </Typography>
            <br/><br/>
            <Typography
                variant="h4">
                Reviews
            </Typography>
        </Container>
        
    )
    
}