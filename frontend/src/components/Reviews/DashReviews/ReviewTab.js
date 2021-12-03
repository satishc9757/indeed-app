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
const ReviewsTab = (props) => {
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
    const [comp_id,setcompid]=useState(2)
    const [comp_name,setcompName]=useState("Adidas")
    const [user_type,set_user_type]=useState("employer") 
    const [btndisable,setbtndisable]=useState(user_type!="employer"?true:false)
    const [fullupdate,setfullupdate]=useState(false)
    const [featured,setisfeatured]=useState({})
      
    const department_list = []
    var result={}
    
    console.log("here is the props",props.CompanyDetails)
    function remove_featured_review(review_id,rating){
      console.log("from remove",review_id,rating,fullupdate)
      console.log("here is the featured list",featured)
     
        let data={
          review_status:false,
          review_id:review_id
        }
        axios.post(process.env.REACT_APP_BACKEND+"api/company/updateFeaturedReview",data).then((response)=>{
    
          if(response.status === 200)
          {
              console.log("updated successfully",fullupdate)
              setfullupdate(!fullupdate);
          }
          else{
                console.log("Something went wrong")
          }
    
        })
        
      }
      
    
    
    
    
    
    
    
    function add_featured_review(review_id,rating){
      console.log("from add",review_id,rating)
      console.log("error",featured,fullupdate)


      
      let featured_count=0
      if(featured.length>3 || review_id in featured){
        console.log("Cannot be added1")
        return
      }
    
    
      if (rating<2.5 && featured.length<=3){
        console.log("Can be added2")
        return
      }
      else{  
      for(const [key, val] of Object.entries(featured)) {
        if (featured[key]>2.5){
          featured_count=featured_count+1
        }
      }
      if (featured_count>=3){
        console.log("cannot be added3")
      }
      else{
        console.log("can be added4")
        let data={
          review_status:true,
          review_id:review_id
        }
        axios.post(process.env.REACT_APP_BACKEND+"api/company/updateFeaturedReview",data).then((response)=>{
    
          if(response.status === 200)
          {
              console.log("updated successfully")
    
          }
          else{
                console.log("Something went wrong")
          }
    
        })
    
      }
      console.log("update is here",fullupdate)
      setfullupdate(!fullupdate)
    
    }

    
    }
    




    useEffect(()=>{
      /*
      let compdetails=props.CompanyDetails.data[0]
      console.log("data------------------------>",props.CompanyDetails.data[0])
      
      setcompid(compdetails.comp_id)
      setcompName(compdetails.comp_name)
      */

      axios.get(process.env.REACT_APP_BACKEND+`api/company/getReviewsByCompId?compId=${comp_id}`).then(response=>{
                
        if(response.status === 200)
        {
          let featured={}
          let result=[]
          
          for(let  i of response.data){
            if (! i["review_company_id"]){
                continue
            }
            if(i["review_user_id"]==userid){
              if(i["review_is_featured"]==1)
              {
                
                featured[i["review_id"]]=i["review_company_rating"]
                  
                result.unshift(<FeaturedReviewCard review={i}  btn={btndisable} remove_featured_review={remove_featured_review}  />)}
              else
                { result.unshift(<ReviewCard review={i} btn={btndisable} add_featured_review={add_featured_review}  />)}
            }
            else if(i["review_is_featured"]==1){
              featured[i["review_id"]]=i["review_company_rating"]
                        
              result.push(<FeaturedReviewCard review={i} btn={btndisable} remove_featured_review={remove_featured_review}/>)
            }
            else{
              result.push(<ReviewCard review={i} btn={btndisable} add_featured_review={add_featured_review} />)
            }
          }
          setisfeatured(featured)
          
          setoriginal(result)
          setcurrent(JSON.parse(JSON.stringify(result)))
          
        }
        else if(response.status === 202)
        {
            console.log(response)
        }

})


    },[fullupdate]);






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
    temp.sort((a,b) => (a["found_helpful"] > b["found_helpful"]) ? 1 : -1 )
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
         
          
                <ReviewAutoComplete comp_name={comp_name} comp_id={comp_id} data={salaries} dept_list={department_list} applyfilter = {applyfilter} sort = {applysort} setdept={setdeptfilter}/>
                
                
          </Grid>
        </Grid>
      </Paper>
        <ReviewsPanel updated = {updated} original={original} />
      
      </Box>

        </div>
    )
}

export default ReviewsTab
