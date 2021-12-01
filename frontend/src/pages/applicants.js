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
import { connect } from "react-redux";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import axios from 'axios';
import backendServer from '../webConfig';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#008b8b",
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

    constructor(){
        super()
        this.state={
            applicants:[],
            update:false,
            id:null
        }
    }
    
    async componentDidMount(){
        var response = await axios.get(`${backendServer}/employer/applications?jobId=619db70dfcc04cecadbd5f5a`);
        console.log(response);
    }

    render(){
        return(
            <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        <StyledTableCell>Order ID</StyledTableCell>
                        <StyledTableCell align="right">Customer Name</StyledTableCell>
                        <StyledTableCell align="right">Delivery Type</StyledTableCell>
                        <StyledTableCell align="right">Order Status</StyledTableCell>
                        <StyledTableCell align="right">Order Mode</StyledTableCell>
                        <StyledTableCell align="right">Order Date</StyledTableCell>
                        <StyledTableCell align="right">Order Time</StyledTableCell>
                        <StyledTableCell align="right">Update</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                        {this.state.applicants.map((row) => (
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                            <Button style={{color: "blue"}} type="button" color="inherit" value={row._id} onClick={this.handleClickOpen}>
                            {row._id}
                            </Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <Button onClick={()=> this.profile(row.custId)}>{row.customerName}</Button>
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.deliveryType}</StyledTableCell>
                            {this.state.update && this.state.id===row._id ? ( 
                                <FormControl>
                                <InputLabel id="update">Order Status</InputLabel>
                                <Select
                                labelId="update"
                                id="update"
                                defaultValue={"Null"}
                                label="Order Status"
                                name="update"
                                onChange={this.onChange}
                                >
                                <MenuItem value={"Order Recieved"}>Order Recieved</MenuItem>
                                <MenuItem value={"Preparing"}>Preparing</MenuItem>
                                <MenuItem value={"On the Way"}>On the Way</MenuItem>
                                <MenuItem value={"Delivered"}>Delivered</MenuItem>
                                <MenuItem value={"Pickup Ready"}>Pickup Ready</MenuItem>
                                <MenuItem value={"Cancelled Order"}>Cancel Order</MenuItem>
                                <MenuItem value={"Picked Up"}>Picked Up</MenuItem>
                                </Select>
                                </FormControl>
                                // <TextField
                                // autoComplete="update"
                                // name="update"
                                // required
                                // id="update"
                                // label="Status Update"
                                // onChange={this.onChange}
                                // autoFocus
                                // />
                            ):(
                                <StyledTableCell style={{color: "green"}} align="right">{row.orderStatus}</StyledTableCell>
                            )}
                            <StyledTableCell align="right">{row.Order_Mode}</StyledTableCell>
                            <StyledTableCell align="right">{row.date}</StyledTableCell>
                            <StyledTableCell align="right">{row.time}</StyledTableCell>
                            {this.state.update && this.state.id===row._id? ( 
                                <Button 
                                    onClick={() => this.update(row)}  
                                    value={[row]} 
                                    size="small">
                                        Submit
                                </Button>
                            ):(
                                <Button 
                                    onClick={() => this.enableEdit(row)}  
                                    value={[row]} 
                                    size="small">
                                        Update Status
                                </Button>
                            )}
                        </StyledTableRow>

                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        )
    }

}
const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(Applicants)