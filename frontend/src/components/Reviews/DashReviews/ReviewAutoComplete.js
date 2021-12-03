import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Button from '@mui/material/Button';
import ReviewModal from './ReviewModal'
export default function ReviewAutoComplete(props) {
    const top100Films=props.data
    const [title,settitle]=useState()
    const [category,setcategory]=useState()
    const [place,setplace]=useState("all")
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event, value) => {setplace(value);console.log("value",value)};
    const handleJobChange = (event, value) => {setcategory(value.category);settitle(value.salary_job_title)};
    console.log(props)
    let opts=[]
    for(let i=0;i<=5;i+=0.5){
        opts.push(i)
    }
    const handleSearch=()=>{
        props.applyfilter(category,title,place)
    }
    const options = top100Films.map((option) => {
        const firstLetter = option.category.toLowerCase()
        return {
          firstLetter:firstLetter,
          ...option,
        };
      });

    const locations=top100Films.map((option)=>{return option.salary_job_location})
  return (<div className="container" style={{display:"flex",alignItems:"center",justifyContent:"center", background:"#faf9f8"}}>
      
      <table>
      <tr><td><ReviewModal comp_name={props.comp_name} comp_id={props.comp_id}  style={{float:"right",marginTop:"0.9rem"}} /></td></tr>
      <div style={{}}> 
        <td>
<label><b>Filter By Ratings</b></label>
<Autocomplete
    disablePortal
    id="combo-box-demo"
    options={opts}
  
   
    getOptionLabel={(option) => option}
    sx={{ width: 300 }}
    onChange={(e,v)=>{props.applyfilter(e.target.value)}}
    size="small"
    onChange={(e,v)=>{props.applyfilter(v)}}
    style={{background:"white"}}
    renderInput={(params) => <TextField {...params}/>}

    />
</td>
<td>
  <br />
<Button variant="outlined" onClick={()=>props.sort("helpful")}>
        Sort by Helpfulness
      </Button>
</td>
<td>
  <br />
  <Button variant="outlined" onClick={()=>props.sort("rating")}>
  Sort by Rating
      </Button>
</td>
</div>

</table>   </div>
  
  );
}

