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

class AdminNavBar extends Component {
  signOut = async (e) => {
    await sessionStorage.clear();
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
            <div>
              <Button>
                <Link to="/analytics">Dashboard</Link>
              </Button>
            </div>
            <div>
              <Button>
                <Link to="/companieslist">Companies</Link>
              </Button>
            </div>
            <div>
              <Button onClick={this.signOut}>
                <Link to="/">SignOut</Link>
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default AdminNavBar;
