import { Component } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {Container} from '@material-ui/core';
import { connect } from "react-redux";
import {Link, useLocation} from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import NavBar from "../../components/user/NavBar";
import axios from 'axios';
import backendServer from '../../webConfig';
import Jobseeker from "../user/jobseekerProfile";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#696969",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));
  
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

const theme = createTheme({
    palette:{
        primary:{
            main:'#004d40',
        },

        secondary:{
            main:'#f5f5f5',
        },
    },
})

class Applicants extends Component{

    constructor(props){
        super(props)
        this.state={
            applicants:[],
            update:false,
            id:null
        }
        sessionStorage.removeItem('job-seeker-id');
    }

    getapplicants = async()=>{
        var response = await axios.get(`${backendServer}/employer/applications?jobId=${sessionStorage.getItem("applicants-job-id")}`);
        await this.setState({
            applicants:response.data
        })
    }
    
    async componentDidMount(){
        console.log("props",this.props);
        this.getapplicants();
    }

    onChange = async (e)=>{
        await this.setState({
            application_status:e.target.value
        })
    }

    profile = async(id)=>{
        console.log(id);
        await sessionStorage.setItem('job-seeker-id',id);
    }

    update = async(row)=>{
        console.log(row,this.state)
        var data = {
            "app_id":row._id,
            "app_status": this.state.application_status
        }

        var res = await axios.post(`${backendServer}/employer/application/status`,data);
        await this.getapplicants();
        await this.setState({
            update:false,
        })
    }


    enableEdit = async(row)=>{
        await this.setState({
            update:true,
            id:row._id
        })
    }

    render(){
        return(
            <div>
                <NavBar />
                <Container>
                    <TableContainer>
                        <Table sx={{ maxWidth: '70%' }} style={{margin: '2% auto', align:'center' }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                <StyledTableCell>User Name</StyledTableCell>
                                <StyledTableCell align="right">Resume</StyledTableCell>
                                <StyledTableCell align="right">Cover Letter</StyledTableCell>
                                <StyledTableCell align="right">Application Status</StyledTableCell>
                                <StyledTableCell align="right">Update</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {this.state.applicants.map((row) => (
                                <StyledTableRow>
                                    <StyledTableCell component="th" scope="row">
                                        <Button><Link to="/jobseeker" onClick={()=> this.profile(row.app_job_seeker_id)}>{row.app_name}</Link></Button>
                                    </StyledTableCell>
                                    <StyledTableCell align="right"><a href ={row.app_resume_link} target="_blank">Resume</a></StyledTableCell>
                                    <StyledTableCell align="right"><a href = {row.app_cover_letter_link} target="_blank">Cover Letter</a></StyledTableCell>
                                    
                                    {this.state.update && this.state.id===row._id ? ( 
                                        <StyledTableCell style={{margin :'auto'}}  align="right">
                                        <FormControl>
                                            <InputLabel  id="update">Application Status</InputLabel>
                                            <Select
                                            labelId="update"
                                            id="update"
                                            defaultValue={"Null"}
                                            label="Application Status"
                                            name="update"
                                            onChange={this.onChange}
                                            >
                                            <MenuItem value={"Submitted"}>Submitted</MenuItem>
                                            <MenuItem value={"Reviewed"}>Reviewed</MenuItem>
                                            <MenuItem value={"Initial Screening"}>Initial Screening</MenuItem>
                                            <MenuItem value={"Interviewing"}>Interviewing</MenuItem>
                                            <MenuItem value={"Hired"}>Hired</MenuItem>
                                            </Select>
                                        </FormControl>
                                        </StyledTableCell>
                                    ):(
                                        <StyledTableCell align="right">{row.app_status}</StyledTableCell>
                                    )}
                                    <StyledTableCell align="right">
                                    {this.state.update && this.state.id===row._id? ( 
                                        <Button style={{margin :'auto'}} 
                                            onClick={() => this.update(row)}  
                                            value={[row]} 
                                            size="small">
                                                Submit
                                        </Button>
                                    ):(
                                        <Button style={{margin :'auto'}} 
                                            onClick={() => this.enableEdit(row)}  
                                            value={[row]} 
                                            size="small">
                                                Update Status
                                        </Button>
                                    )}
                                    </StyledTableCell>
                                </StyledTableRow>

                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Container>
            </div>
        )
    }

}
const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(Applicants)