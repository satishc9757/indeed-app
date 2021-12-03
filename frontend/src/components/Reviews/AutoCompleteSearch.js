import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import SalaryModal  from './SalaryModal';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
export default function AutoCompleteSearchBox(props) {
    const top100Films=props.data
    const [title,settitle]=useState()
    const [category,setcategory]=useState()
    const [place,setplace]=useState("all")
    
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event, value) => {setplace(value);console.log("value",value)};
    const handleJobChange = (event, value) => {setcategory(value.category);settitle(value.salary_job_title)};
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
      <tr><h3> <b>How much does {"company"} pay for {"role"}</b> </h3></tr>
        <td>
      <label><b>Jobs</b></label>
    <Autocomplete
    id="grouped-demo"
    
    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
    groupBy={(option) => option.firstLetter}
    getOptionLabel={(option) => option.salary_job_title}
    sx={{ width: 300}}
    style={{background:"white"}}
    size="small"
    onChange={handleJobChange}
    renderInput={(params) => <TextField {...params} />}
    />
    <br />
</td><td>
<label><b>Place</b></label>
<Autocomplete
    disablePortal
    id="combo-box-demo"
    options={locations}
  
   
    getOptionLabel={(option) => option}
    sx={{ width: 300 }}
    onChange={handleChange}
    size="small"
    style={{background:"white"}}
    renderInput={(params) => <TextField {...params}/>}

    />
</td>
<td>
  <br />
<Button variant="outlined" onClick={handleSearch}>
        Search
      </Button>
</td>
<td>
  <br />
<SalaryModal department_list={props.dept_list} />
</td>
</table>   </div>
  
  );
}

