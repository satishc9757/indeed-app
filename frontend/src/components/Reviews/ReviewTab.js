import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import FeaturedReviewCard from './FeaturedReviewCard';
import ReviewCard from './ReviewCard'
import ReviewsPanel from './ReviewsPanel';
import ReviewAutoComplete from './ReviewAutoComplete';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
const ReviewsTab = () => {
    const [userid,setuserid]=useState(1)
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
    const [main,setmain]=useState([])
    
    const department_list = []
    var result={}
    useEffect(()=>{

      axios.get("http://localhost:8000/api/company/getReviewsByCompId?compId=1").then(response=>{
                
        if(response.status === 200)
        {
          let result=[]
          
          for(let  i of response.data){
            if (! i["review_company_id"]){
                continue
            }
            if(i["review_user_id"]==userid){
              if(i["review_is_featured"]==0)
                {result.unshift(<FeaturedReviewCard review={i}/>)}
              else
                { result.unshift(<ReviewCard review={i} />)}
            }
            else if(i["review_is_featured"]==0){
                    result.push(<FeaturedReviewCard review={i}/>)
            }
            else{
              result.push(<ReviewCard review={i} />)
            }
          }
          setoriginal(result)
          setcurrent(JSON.parse(JSON.stringify(result)))
          
        }
        else if(response.status === 202)
        {
            console.log(response)
        }

})


    },[]);






function applyfilter(rating){

  console.log(original[0].props.review)
  for(let i=0;i<original.length;i++){
    if(rating==original[i].props.review.review_company_rating){
      let temp=original[i];
      original.splice(i,1)
      original.unshift(temp)  
    }
  }
setupdated(!updated);

  




  
    
    

}
function applysort(bases){
  console.log(bases)
  
  let temp=original
  if(bases=="rating"){
    temp.sort((a, b) => (a["review_company_rating"] > b["review_company_rating"]) ? 1 : -1)
    
  }
  else{
    temp.sort((a,b) => (a.review_date > b.review_date) ? 1 : ((b.review_date > a.review_date) ? -1 : 0))
  }
  console.log(original,current)
  setupdated(!updated)
}


    return (
        <div>
            <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            
            
           
            <Paper sx={{my: 1, mx: 'auto', p: 2 }}>
        <Grid container wrap="nowrap" spacing={2} >
        
          <Grid item xs zeroMinWidth textAlign="left">
         
          
                <ReviewAutoComplete data={salaries} dept_list={department_list} applyfilter = {applyfilter} sort = {applysort} setdept={setdeptfilter}/>
                
                
          </Grid>
        </Grid>
      </Paper>
        <ReviewsPanel updated = {updated} original={original} />
      
      </Box>

        </div>
    )
}

export default ReviewsTab
