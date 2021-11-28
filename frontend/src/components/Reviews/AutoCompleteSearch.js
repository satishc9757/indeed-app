import React,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

        
     
export default function ComboBox() {
    const [autoval,setautoval]=useState()
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event, value) => {setSelectedOptions(value);console.log(value)};

    const options = top100Films.map((option) => {
        const firstLetter = option.categoy[0].toUpperCase();
        return {
          firstLetter:firstLetter,
          ...option,
        };
      });
  return (<div className="container" style={{display:"flex",alignItems:"center",justifyContent:"center", background:"#faf9f8"}}>
      <table><td>
      <label><b>Jobs</b></label>
    <Autocomplete
    id="grouped-demo"
    
    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
    groupBy={(option) => option.firstLetter}
    getOptionLabel={(option) => option.title}
    sx={{ width: 300}}
    style={{background:"white"}}
    size="small"
    onChange={handleChange}
    renderInput={(params) => <TextField {...params} />}
    />
    <br />
</td><td>
<label><b>Place</b></label>
<Autocomplete
    id="grouped-demo"
    
    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
    groupBy={(option) => option.firstLetter}
    getOptionLabel={(option) => option.title}
    sx={{ width: 300 }}
    onChange={handleChange}
    size="small"
    style={{background:"white"}}
    renderInput={(params) => <TextField {...params}/>}
    />
</td></table>   </div>
  
  );
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 , categoy:"A"},
    { title: 'The Godfather', year: 1972 , categoy:"A" },
    { title: 'The Godfather: Part II', year: 1974 , categoy:"B"},
    { title: 'The Dark Knight', year: 2008  , categoy:"B"},
    { title: '12 Angry Men', year: 1957 ,  categoy:"C"},
    
  ];
  