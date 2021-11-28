import * as React from 'react';
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
export default function SalaryModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [radioval,setradioval]=React.useState("yes");
  const [paid_time_radioval,set_paid_time_radioval]=React.useState("no");
  const [health_radioval,set_health_radioval]=React.useState("no");
  const [life_radioval,set_life_radioval]=React.useState("no");
  const [dental_radioval,set_dental_radioval]=React.useState("no");
  const [retirement_radioval,set_retirement_radioval]=React.useState("no");
  const [other_radioval,set_other_radioval]=React.useState("no");


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
            id="company_name"
            label="Company Name"
            type="text"
            fullWidth
            variant="standard"
            required
          />
            <br /> <br />
           
         
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
            disabled={other_radioval=="yes"?false:true}
        />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add Review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
