/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import logo from "../../media/IndeedLogo.png";
import { Box } from "@mui/system";
import backendServer from "../../webConfig";
import getFirstPageData from "../../redux/actions/signupAction";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();




  const dispatch = useDispatch();

  const next = () => {
    const email_val = /^\S+@\S+\.\S+$/
        if (!email_val.test(email)){
            console.log('email')
            alert('Invalid Email ID')
            return;
        }
    dispatch(getFirstPageData({ email, password, role }));
    if (role === "jobseeker") {
      navigate("/jobseekersignup");
    } else if (role === "employer") {
      navigate("/employersignup");
    }
  };

  return (
    <div style={{ backgroundColor: "#F3F2F1", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "#F3F2F1",
          width: "100vw",
          // height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "1%",
        }}
      >
        <center>
          <div style={{ textAlign: "center", paddingBottom: "1%" }}>
            <img src={logo} alt="Profile" width="115" height="40" />
          </div>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              // height: "60vh",
              width: "26vw",
              borderRadius: "10px",
            }}
          >
            <div
              style={{ textAlign: "left", paddingTop: "1%", paddingLeft: "3%" }}
            >
              <span style={{ fontWeight: "8px", fontSize: "25px" }}>
                Ready to take the next step? <br />
              </span>
              <span>
                <br />
                Create an account
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      type="email"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <TextField
                      type="password"
                      required
                      fullWidth
                      id="password"
                      type="password"
                      label="Password"
                      name="password"
                      autoComplete="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Grid>
                  <div
                    style={{
                      textAlign: "left",
                      paddingTop: "1%",
                      paddingLeft: "6%",
                    }}
                  >
                    <span style={{ fontWeight: "8px", fontSize: "25px" }}>
                      Choose your role <br />
                    </span>
                    <span>
                      <br />
                      Let us know how you will be using this application.
                    </span>
                  </div>
                  <Grid
                    item
                    xs={12}
                    style={{ margin: "10px", textAlign: "left" }}
                  >
                    <input
                      type="radio"
                      id="employer"
                      name="role"
                      value="Employer"
                      onClick={(e) => setRole("employer")}
                    />
                    <label for="employer">Employer</label>
                    <br />
                    <input
                      type="radio"
                      id="jobseeker"
                      name="role"
                      value="Jobseeker"
                      onClick={(e) => setRole("jobseeker")}
                    />
                    <label for="jobseeker">Jobseeker</label>
                  </Grid>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={next}
                    >
                      Next
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <a href="/login" variant="body2">
                          Existing user. Login in!
                        </a>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}
