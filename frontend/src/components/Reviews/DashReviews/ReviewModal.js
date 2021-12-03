import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'
import {useState} from 'react'
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export default function SalaryModal(props) {
  const [open, setOpen] = useState(false);
  const [rating, setrating] = useState(0);
  const [title, set_title] = useState();
  const [summary, set_summary] = useState();
  const [pros, set_pros] = useState();
  const [city, set_city] = useState();
  const [state, set_state] = useState();
  const [cons, set_cons] = useState();
  const [prep, set_prep] = useState();
  const [ceorating, setceorating] = useState(0);
  const [userid,setuserid]=useState(sessionStorage.getItem("job-seeker-id"))
  const [companyid,setcompanyid]=useState(sessionStorage.getItem("emp_company_id"))
  const [company_name,setcompany_name]=useState(sessionStorage.getItem("job_company_name"))
  const [user_type,set_user_type]=useState(sessionStorage.getItem("user-type")) 
  const [btndisable,setbtndisable]=useState(user_type=="employer"?true:false)
  

  
  var user="User1"


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit=async ()=>{
    console.log("here----------->",companyid)
    let  add_data={
            rating:rating,
            title:title,
            summary:summary,
            pros:pros,
            cons:cons,
            prep:prep,   
            companyid:props.comp_id,
            userid:userid,
            ceo:ceorating,
            city:city,
            state:state
     }
     axios.defaults.headers.common.authorization = await localStorage.getItem("token");
     axios.post(process.env.REACT_APP_BACKEND+"api/company/addEmployeeReview",add_data).then(response=>{
                
      if(response.status === 200)
      {
       console.log("Added successflly")
       handleClose()
       
      }
      else if(response.status === 202)
      {
          console.log("nope")
      }
      else{
        console.log("something went wrong")
      }

})


  }

  const handleClose = () => {
    setOpen(false);
  };
  console.log("modal props----------------->",props)
  return (
    <div>
         <b style={{fontSize:"30px"}}>{props.comp_name} employees review</b>
      <Button variant="outlined" onClick={handleClickOpen} style={{float:"right",marginTop:"1rem"}} disabled={btndisable}>

        Review this Company
      </Button>
      <Dialog open={open} onClose={handleClose}  >
        <DialogTitle style={{textAlign:"center"}}>Add your review</DialogTitle>
        <DialogContent sx={{width:"400px"}}>
        <Typography component="legend">Add your rating</Typography>
        <Rating required style={{color:"#aa4069"}}  name="half-rating" defaultValue={2.5} precision={0.5} onChange={(e,v)=>{console.log(e.target.value,"----",v);setrating(e.target.value)}} />
        <br />
            <br />
            <TextField
            label="Your Review Title"
            placeholder="Your Review Title"
            multiline
            sx={{width:"100%"}}
            required
            onChange={(e,v)=>set_title(e.target.value)}
        
        />
        <br /><br />
        <TextField
            required
            label="Review Summary"
            placeholder="Review Summary"
            multiline
            sx={{width:"100%"}}
            onChange={(e,v)=>set_summary(e.target.value)}
        
        />

                <br />
        <br />
            <TextField
            label="Pros"
            placeholder="Pros"
            multiline
            sx={{width:"100%"}}            
            onChange={(e,v)=>set_pros(e.target.value)}
        
        />
        <br />
        <br /><TextField
            label="City"
            placeholder="City"
            multiline
            sx={{width:"100%"}}            
            onChange={(e,v)=>set_city(e.target.value)}
        
        />
        <br />
        <br /><TextField
            label="State"
            placeholder="State"
            multiline
            sx={{width:"100%"}}            
            onChange={(e,v)=>set_state(e.target.value)}
        
        />
        <br />
        <br />
            <TextField
            label="Cons"
            placeholder="Cons"
            multiline
            sx={{width:"100%"}}            
            onChange={(e,v)=>set_cons(e.target.value)}
        
        />
        <br />
        <br />
            <TextField
            label="How to prepare for interviews"
            placeholder="How to prepare for interviews"
            multiline
            sx={{width:"100%"}}            
            onChange={(e,v)=>set_prep(e.target.value)}
        
        />

<br /><br />
        <Typography component="legend">CEO rating</Typography>
        <Rating required name="half-rating" style={{color:"#aa4069"}}  defaultValue={2.5} precision={0.5} onChange={(e,v)=>{console.log(e.target.value,"----",v);setceorating(e.target.value)}} />
        <br /><br />
        


       </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>{handleSubmit()}}>Add Review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
