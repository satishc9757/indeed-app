import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//pages import
import Home from "./pages/general/home";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import UploadResume from "./pages/general/uploadResume";
import Snapshot from "./pages/company/snapshot";
import Common from "./pages/company/common";
import Jobseeker from "./pages/user/jobseekerProfile";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import JobDetailsCard from "./components/landingpage/JobDetailsCard";
import Salaries from './pages/general/salaries'
import { ThemeProvider} from '@material-ui/styles'
import CompanyReviews from './pages/companyReviews';
import JobseeekerSignup from "./pages/user/JobseekerSignup";
import EmployerSignup from "./pages/user/EmployerSignup";

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



            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
