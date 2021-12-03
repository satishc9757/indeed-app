import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from 'axios'
import {useState} from 'react'
import Autocomplete from '@mui/material/Autocomplete';
export default function SalaryModal(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(new Date('2014-08-18T21:11:54'));
  const [userid,setuserid]=useState("User1")
  const [companyid,setcompanyid]=useState("Comp1")
  const [salary_end_date,setenddata]=useState()
  const [salary_job_loc,setjobloc]=useState()
  const [salary_job_title,setjobtitle]=useState()
  const [radioval,setradioval]=useState("yes");//isworking
  const [paid_time_radioval,set_paid_time_radioval]=useState("no");
  const [health_radioval,set_health_radioval]=useState("no");
  const [life_radioval,set_life_radioval]=useState("no");
  const [dental_radioval,set_dental_radioval]=useState("no");
  const [retirement_radioval,set_retirement_radioval]=useState("no");
  const [other_radioval,set_other_radioval]=useState("no");
  const [benifits,set_benifits]=useState();
  const [pay,set_jobpay]=useState();
  const [workex,setworkex]=useState();
  const [category,setcategory]=useState()
  
  var user="User1"


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleSubmit=()=>{
    console.log("here----------->",companyid)
    let  add_data={
       salary_user_id:userid,
       salary_company_id:companyid,
       salary_is_working:radioval=="yes"?true:false,
       salary_end_date:salary_end_date,
       salary_job_title:salary_job_title,
       salary_job_location:salary_job_loc,
       salary_pay:pay,
       salary_workex:workex,
       salary_paid_timeoff:paid_time_radioval=="yes"?true:false,
       salary_health_insurance:health_radioval=="yes"?true:false,
       salary_retirement:retirement_radioval=="yes"?true:false,
       salary_other_benifits:retirement_radioval=="yes"?true:false,
       category:category,
       benifits:benifits



     }
     axios.post("http://localhost:8000/api/company/addSalaryReview",add_data).then(response=>{
                
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
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a Salary
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{textAlign:"center"}}>Add your salary review</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="companyid"
            //label="Company Name"
            name="companyid"
            type="text"
            fullWidth
            variant="standard"
            required
            value={companyid}
            disabled
            onChange={(e,v)=>{setcompanyid(e.target.value);console.log("------------------->",e.target.value)}}
          />
            <br /> <br />
           
            <Autocomplete
    disablePortal
    id="combo-box-demo"
    options={props.department_list}
  
   
    getOptionLabel={(option) => option}
    sx={{ width: 300 }}
    onChange={(e,v)=>{setcategory(v);console.log("here are the values---------->",v);console.log(e.target)}}
    size="small"
    style={{background:"white"}}
    renderInput={(params) => <TextField {...params}/>}

    />
          <FormControl component="fieldset">




    
  <FormLabel component="legend">Currently working?</FormLabel>
  <RadioGroup row aria-label="currently_working" name="row-radio-buttons-group" value={radioval} onChange={(e,val)=>setradioval(val)}>
    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
    <FormControlLabel value="no" control={<Radio />} label="No" />
    
         </RadioGroup>
         
            </FormControl>
            <br /> <br />
            <TextField id="date" style={{visibility:radioval=="yes"?"hidden":"visible"}} label="Last Working Date" type="date" defaultValue="2021-11-27" sx={{ width: 220 }} InputLabelProps={{ shrink: true}} />
            <br /> <br />
            <TextField
            autoFocus
            margin="dense"
            id="job_title"
            label="Job Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e,v)=>setjobtitle(e.target.value)}
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="job_location"
            label="Job Location"
            type="text"
            fullWidth
            variant="standard"
            required
            onChange={(e,v)=>setjobloc(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="job_pay"
            label="Annual Salary"
            type="number"
            fullWidth
            variant="standard"
            required
            onChange={(e,v)=>set_jobpay(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="job_workex"
            label="Relevant Work Experience"
            type="number"
            fullWidth
            variant="standard"
            required
            onChange={(e,v)=>{setworkex(e.target.value);console.log("here is the work experience",e.target.value)}}
          />
          <br /><br />

        <FormControl component="fieldset">
            <FormLabel component="legend">Paid Time Off?</FormLabel>
            <RadioGroup row aria-label="paid" name="row-radio-buttons-group" value={paid_time_radioval} onChange={(e,val)=>set_paid_time_radioval(val)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
       </FormControl>
       <br /><br />
       <FormControl component="fieldset">
            <FormLabel component="legend">Health insurance</FormLabel>
            <RadioGroup row aria-label="health" name="row-radio-buttons-group" value={health_radioval} onChange={(e,val)=>set_health_radioval(val)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
       </FormControl>

       <br /><br />
       <FormControl component="fieldset">
            <FormLabel component="legend">Life insurance</FormLabel>
            <RadioGroup row aria-label="life_insurance" name="row-radio-buttons-group" value={life_radioval} onChange={(e,val)=>set_life_radioval(val)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
       </FormControl>

       <br /><br />
       <FormControl component="fieldset">
            <FormLabel component="legend">Dental / vision insurance</FormLabel>
            <RadioGroup row aria-label="dental_insurance" name="row-radio-buttons-group" value={dental_radioval} onChange={(e,val)=>set_dental_radioval(val)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
       </FormControl>

       <br /><br />
       <FormControl component="fieldset">
            <FormLabel component="legend">Retirement</FormLabel>
            <RadioGroup row aria-label="retirement_insurance" name="row-radio-buttons-group" value={retirement_radioval} onChange={(e,val)=>set_retirement_radioval(val)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
       </FormControl>
       <br /><br />
       <FormControl component="fieldset">
            <FormLabel component="legend">Other Benifits</FormLabel>
            <RadioGroup row aria-label="other" name="row-radio-buttons-group" value={other_radioval} onChange={(e,val)=>set_other_radioval(val)}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
       </FormControl>
       <br /><br />
       <TextField
            placeholder="Other benifits"
            multiline
            rows={2}
            rowsMax={4}
            onChange={(e,v)=>set_benifits(e.target.value)}
            disabled={other_radioval=="yes"?false:true}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>{handleSubmit()}}>Add Review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
