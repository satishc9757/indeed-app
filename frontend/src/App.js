import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FeaturedReviewCard from "./components/Reviews/FeaturedReviewCard";
import AutoCompleteSearch from "./components/Reviews/AutoCompleteSearch";
import SalayReviewsTab from "./components/Reviews/SalayReviewsTab";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
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
import Salaries from "./pages/general/salaries";
import JobPosted from "./pages/employer/jobPosted";
import JobseeekerSignup from "./pages/user/JobseekerSignup";
import EmployerSignup from "./pages/user/EmployerSignup";
import Common from "./pages/company/common";
import CompanyProfile from "./pages/company/companyProfile";
import CompanyList from "./pages/admin/companyList";
import Conversations from "./pages/general/conversations";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import EmployerHome from "./pages/employer/employerHome";
import JobDetailsCard from "./components/landingpage/JobDetailsCard";
import Applicants from "./pages/employer/applicants";
import JobPostings from "./pages/employer/jobPostings";
import JobStats from "./pages/employer/jobStats";
import Reviews from './pages/admin/reviews';
import Analytics from "./pages/admin/Analytics";
import SalaryReviewTabCard from "./components/Reviews/SalaryReviewTabCard";
import SalaryReviewColumn from "./components/Reviews/SalaryReviewColumn";
import ReviewTab from "./components/Reviews/ReviewTab";
import ReviewCard from "./components/Reviews/ReviewCard";
import CompanyReviews from "./pages/companyReviews";

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
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route path="/upload" element={<UploadResume />} />
              <Route exact path="/common" element={<Common />} />
              <Route exact path="/jobseeker" element={<Jobseeker />} />
              <Route exact path="/salaries" element={<Salaries />} />
              <Route exact path="/jobdetails" element={<JobDetailsCard />} />
              <Route
                exact
                path="/companyreviews"
                element={<CompanyReviews />}
              />
              <Route exact path="/employer" element={<EmployerHome />} />
              <Route exact path="/jobs" element={<JobPosted />} />
              <Route
                exact
                path="/reviewCard"
                element={<FeaturedReviewCard />}
              />
              <Route
                exact
                path="/autoComplete"
                element={<AutoCompleteSearch />}
              />
              <Route
                exact
                path="/salaryTab"
                element={<SalaryReviewTabCard />}
              />
              <Route
                exact
                path="/addSalaryCol"
                element={<SalaryReviewColumn />}
              />
              <Route exact path="/reviewsTab" element={<SalayReviewsTab />} />
              <Route
                exact
                path="/jobseekersignup"
                element={<JobseeekerSignup />}
              />
              <Route
                exact
                path="/employersignup"
                element={<EmployerSignup />}
              />
              <Route exact path="/companylist" element={<CompanyList />} />
              <Route exact path="/applicants/:id" element={<Applicants />} />
              <Route exact path="/applicants" element={<Applicants />} />
              <Route
                exact
                path="/companyprofile"
                element={<CompanyProfile />}
              />
              <Route exact path="/conversations" element={<Conversations />} />
              <Route exact path="/jobPostings" element={<JobPostings />} />
              <Route
                exact
                path="/employer/jobPostings"
                element={<JobPostings />}
              />
              <Route exact path="/employer/jobstats" element={<JobStats />} />
              <Route exact path="/analytics" element={<Analytics />} />
              <Route exact path="/admin/reviews" element={<Reviews/>} />
              <Route
                exact
                path="/salaryReviewsTab"
                element={<SalayReviewsTab />}
              />
              <Route exact path="/companyReviewsTab" element={<ReviewTab />} />
              <Route
                exact
                path="/companyReviewsCard"
                element={<ReviewCard />}
              />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
