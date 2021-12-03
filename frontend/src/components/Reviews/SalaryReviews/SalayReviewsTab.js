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

const SalayReviewsTab = (props) => {
  
    const [salaries,setsalaries]=useState([])
    const [original,setoriginal]=useState([])
    const [departments,setdepts]=useState([])
    const [dept,setdeptfilter]=useState()
    const [filtered,setfiltered]=useState(0)
    const [original_depts,setoriginaldepts]=useState([])
    const [updated,setupdated]=useState(false)
    const [current,setcurrent]=useState([])
    const [mainlist,setmain]=useState([])
    const [comp_id,setcompid]=useState(props.CompanyDetails.data[0].comp_id)
    const [comp_name,setcompName]=useState(props.CompanyDetails.data[0].comp_name)
    const [usertype,setusertype]=useState("employer")
    const [btndisable,setbtndisable]=useState(usertype!="employer"?true:false)

    const department_list = []
    var result={}
    useEffect(async()=>{
      console.log("data--------------------->",props.CompanyDetails.data[0])
      
      //setcompid(props.CompanyDetails.data[0].comp_id)
      //setcompName(props.CompanyDetails.data[0].comp_name)
      
      console.log("here are your props",comp_id,comp_name)
      axios.defaults.headers.common.authorization = await localStorage.getItem("token");
      axios.get(process.env.REACT_APP_BACKEND+`api/company/JobTitleByDept?compId=${comp_id}`).then(response=>{
                
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
    
    for(let i of current){
      if(i["salary_job_title"]==title){
        if (place!="" || place==i["salary_job_location"])
        {
         
          let need=[]
          need.push(i)
          temp.unshift(<SalaryReviewsPanel dept={"Search"} data={need} />)
          setupdated(!updated)
    
          
          break
        }
      }
    }
}
//console.log("original after adding the search criteria",comp_name,comp_id)









    return (
        <div>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            
            
            
            <Paper sx={{my: 1, mx: 'auto', p: 2 }}>
        <Grid container wrap="nowrap" spacing={2} >
          
          <Grid item xs zeroMinWidth textAlign="left">
            
          
                <AutoCompleteSearchBox  btn = {btndisable} comp_name={comp_name} data={salaries} dept_list={department_list} applyfilter = {applyfilter} setdept={setdeptfilter}/>
                
                
          </Grid>
        </Grid>
      </Paper>

      <SalaryPanel original={original} />

      </Box>

        </div>
    )
}

export default SalayReviewsTab
