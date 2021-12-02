import { useState } from "react";
import { Button, Grid, Table, TextField } from "@mui/material";
import logo from "../../media/IndeedLogo.png";
import { Box } from "@mui/system";
import backendServer from "../../webConfig";
import { useSelector } from "react-redux";
import axios from "axios";


export default function JobseeekerSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");

  const signupDetails = useSelector((state) => state.signUp);

  const signup = () => {
    //Call SignUp API here
    axios.post(`${backendServer}/signup`, {
      name: name,
      email: email,
      user_type : signupDetails.role,
      city: city,
      state: state,
      country: country,
      age:age,
      contact: phone,
      password:signupDetails.password
    });
  };

  return (
    <div style={{ backgroundColor: "#F3F2F1", height: "100vh" }}>
      <div
        style={{
          backgroundColor: "#F3F2F1",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "7%",
        }}
      >
        <center>
          <div style={{ textAlign: "center", paddingBottom: "1%" }}>
            <img src={logo} alt="Profile" width="115" height="40" />
          </div>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              height: "65vh",
              width: "30vw",
              borderRadius: "10px",
            }}
          >
            <div
              style={{ textAlign: "left", paddingTop: "1%", paddingLeft: "2%" }}
            >
              <span style={{ fontWeight: "8px", fontSize: "25px" }}>
                Contact Information <br />
              </span>
              <span>
                <br />
                Let us know more about yourself
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Table>
                    <td style={{ paddingLeft: "2%" }}>
                      <Grid item xs={12} style={{ margin: "10px" }}>
                        <TextField
                          required
                          fullWidth
                          id="city"
                          label="City"
                          name="city"
                          autoComplete="city"
                          onChange={(e) => {
                            setCity(e.target.value);
                          }}
                        />
                      </Grid>
                    </td>
                    <td>
                      <Grid item xs={12} style={{ margin: "10px" }}>
                        <TextField
                          required
                          fullWidth
                          id="state"
                          label="State"
                          name="state"
                          autoComplete="state"
                          onChange={(e) => {
                            setState(e.target.value);
                          }}
                        />
                      </Grid>
                    </td>
                    <td>
                      <Grid item xs={12} style={{ margin: "10px" }}>
                        <TextField
                          required
                          fullWidth
                          id="country"
                          label="Country"
                          name="country"
                          autoComplete="country"
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                        />
                      </Grid>
                    </td>
                  </Table>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <TextField
                    type="number"
                      required
                      fullWidth
                      id="phone"
                      label="Contact No."
                      name="phone"
                      autoComplete="phone"
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <TextField
                    type="number"
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      name="age"
                      autoComplete="age"
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <Button
                    fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      onClick={signup}
                    >
                      Signup
                    </Button>
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
