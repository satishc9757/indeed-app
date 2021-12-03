/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import logo from "../../media/IndeedLogo.png";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: [],
      notLoggedIn: false,
    };
  }
  async componentDidMount() {
    // let type = sessionStorage.getItem("user_type");
    let type = "jobseeker";
    if (type === "employer") {
      this.setState({
        route: "/companyProfile",
      });
    } else if (type === "jobseeker") {
      this.setState({
        route: "/jobseeker",
      });
    }
  }

  // constructor(props){
  //     this.state={
  //         notLoggedIn:false
  //     }
  // }

  signOut = async (e) => {
    await sessionStorage.clear();
    await localStorage.clear();
    await this.setState({
      notLoggedIn: true,
    });
  };

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative" color="transparent">
          <Toolbar>
            
            <img src={logo} alt="Profile" width="110" height="30" />

            {sessionStorage.getItem("user-type") === "employer" ? (
              <div style={{display:"flex"}}>
                <Button>
                  <Link to="/employer/jobPostings">Create Job Post</Link>
                </Button>
                <Button>
                  <Link to="/jobs">Jobs</Link>
                </Button>
                
              <Button>
                <Link to="/common">Company</Link>
              </Button>
          
                <Button>
                  <Link to="/conversations">Messages</Link>
                </Button>
                <Button>
                  <Link to="/employer/jobstats">Job Stats</Link>
                </Button>
              </div>
            ) : (
              <div>
                <Button>
                  <Link to="/">Find jobs</Link>
                </Button>
               <Button>
                  <Link to="/companyreviews">Company reviews</Link>
                </Button>

                {/* <Button>Company reviews</Button>
                <Button>Find salaries</Button> */}
              </div>
            )}

            {'user-type' in sessionStorage && sessionStorage.getItem("user-type") !== "employer" ? (
              <Button>
                <Link to="/upload">Upload Resume</Link>
              </Button>
            ) : (
              <div>
                  <Button>
                    <Link to="/login">Upload Resume</Link>
                  </Button>
              </div>
            )}
            {!("user-type" in sessionStorage) ? (
              <div>
                <Button>
                  <Link to="/employer">Employers / Post Job</Link>
                </Button>
                <Button>
                  <Link to="/login">Login</Link>
                </Button>
                <Button color="inherit"></Button>
              </div>
            ) : (
              <div>
                {sessionStorage.getItem("user-type") === "jobseeker" ? (
                  <Link to="/jobseeker">
                    <IconButton>
                      <PersonIcon />
                    </IconButton>
                  </Link>
                ) : (
                  <Link to="/companyprofile">
                    <IconButton>
                      <PersonIcon />
                    </IconButton>
                  </Link>
                )}
                <Button onClick={this.signOut}>
                  <Link to="/">SignOut</Link>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(NavBar);
