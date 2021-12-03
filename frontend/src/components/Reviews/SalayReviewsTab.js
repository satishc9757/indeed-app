import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import SalaryReviewTabCard from './SalaryReviewTabCard'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AutoCompleteSearchBox from './AutoCompleteSearch'
import SalaryReviewsPanel from './SalaryReviewsPanel';
import SalaryPanel from './SalaryPanel';

const SalayReviewsTab = () => {
  
    const [company,setcompany]=useState("ABC")
    const [role,setrole]=useState("software engineer intern")
    const [salaries,setsalaries]=useState([])
    const [original,setoriginal]=useState([])
    const [departments,setdepts]=useState([])
    const [dept,setdeptfilter]=useState()
    const [filtered,setfiltered]=useState(0)
    const [original_depts,setoriginaldepts]=useState([])
    const [updated,setupdated]=useState(false)
    const [current,setcurrent]=useState([])
    const [mainlist,setmain]=useState([])
    const department_list = []
    var result={}
    useEffect(()=>{

      axios.get("http://localhost:8000/api/company/JobTitleByDept?compId=Comp1").then(response=>{
                
        if(response.status === 200)
        {
         
          setsalaries(response.data)
          result = response.data.reduce(function (r, a) {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            
            return r;
        }, Object.create(null));
          setdepts(result)
          let curr=[]
          for(const [key, val] of Object.entries(result)) {
            console.log("calling again")
            curr.push(<SalaryReviewsPanel dept={key} data={val} />)
            department_list.push(key)
          }
          setcurrent(curr)
          setmain(curr)
          setoriginal(curr)
          
        }
        else if(response.status === 202)
        {
            
        }

})


    },[]);






function applyfilter(dept,title,place){
    console.log("applyfilter",dept,title,place)
    let current = departments[dept]
    let temp=original
    console.log("original is here",temp)
    for(let i of current){
      if(i["salary_job_title"]==title){
        if (place!="" || place==i["salary_job_location"])
        {
         
          let need=[]
          need.push(i)
          console.log("here is the date we are passing",need)
          temp.unshift(<SalaryReviewsPanel dept={"Search"} data={need} />)
          console.log("different after adding",temp)
          setupdated(!updated)
    
          
          break
        }
      }
    }
    

}
console.log("original after adding the search criteria",original)


    return (
        <div>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            
            
            
            <Paper sx={{my: 1, mx: 'auto', p: 2 }}>
        <Grid container wrap="nowrap" spacing={2} >
          
          <Grid item xs zeroMinWidth textAlign="left">
            
          
                <AutoCompleteSearchBox data={salaries} dept_list={department_list} applyfilter = {applyfilter} setdept={setdeptfilter}/>
                
                
          </Grid>
        </Grid>
      </Paper>

      <SalaryPanel original={original} />

      </Box>

        </div>
    )
}

export default SalayReviewsTab
