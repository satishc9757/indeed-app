import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//pages import
import Home from "./pages/general/home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import UploadResume from "./pages/general/uploadResume";
import Snapshot from "./pages/company/snapshot";
import Jobseeker from "./pages/user/jobseekerProfile";
import Salaries from './pages/general/salaries'
import CompanyReviews from './pages/companyReviews';
import JobseeekerSignup from "./pages/user/JobseekerSignup";
import EmployerSignup from "./pages/user/EmployerSignup";
import Common from './pages/company/common';
import CompanyProfile from './pages/company/companyProfile'
import CompanyList from './pages/admin/companyList'
import Conversations from './pages/general/conversations'
import { ThemeProvider} from '@material-ui/styles'
import { createTheme} from '@mui/material/styles'
import { blue } from '@mui/material/colors';
import JobDetailsCard from './components/landingpage/JobDetailsCard'
import Applicants from './pages/applicants';
import JobPostings from './pages/employer/jobPostings';
import JobStats from './pages/employer/jobStats';

const theme = createTheme({
  pallete: {
    primary: {
      main: "#2557a7",
    },
  },
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route path="/upload" element={<UploadResume/>} />
              <Route exact path="/common" element={<Common/>} />
              <Route exact path="/jobseeker" element={<Jobseeker/>} />
              <Route exact path="/salaries" element={<Salaries/>} />
              <Route exact path="/jobdetails" element={<JobDetailsCard/>} />
              <Route exact path="/companyreviews" element={<CompanyReviews/>} />
              <Route exact path="/jobseekersignup" element={<JobseeekerSignup/>} />
              <Route exact path="/employersignup" element={<EmployerSignup/>} />
              <Route exact path="/companylist" element={<CompanyList/>} />
              <Route exact path="/applicants/:id" element={<Applicants/>} />
              <Route exact path="/applicants" element={<Applicants />} />
              <Route exact path="/companyprofile" element={<CompanyProfile/>} />
              <Route exact path="/conversations" element={<Conversations/>} />
              <Route exact path="/jobPostings" element={<JobPostings/>} />
              <Route exact path="/employer/jobPostings" element={<JobPostings/>} />
              <Route exact path="/employer/jobstats" element={<JobStats/>} />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
