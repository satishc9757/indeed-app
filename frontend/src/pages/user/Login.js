import { useState } from "react"; 
import { Button, Grid, TextField } from "@mui/material";
import logo from "../../media/IndeedLogo.png";
import { Box } from "@mui/system";
import backendServer from "../../webConfig";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const login = async ()=>{
    //Call Login API here
    const data = await axios.post(`${backendServer}/login`,{
     
      email:email,
      password:password

    })
    if(data.data){
      sessionStorage.setItem("user-type",data.data.user_type);
      sessionStorage.setItem("user-email",data.data.user_email);
      sessionStorage.setItem("user-id",data.data.user_id);
    }
    if(data.data.user_type==="employer"){
      navigate("/common");
    }
    else{
      navigate("/")
    }
   

  }

  return (
    <div style={{ backgroundColor: "#F3F2F1",  height: "100vh" }}>
      <div
        style={{
          backgroundColor: "#F3F2F1",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10%",
        }}
      >
        <center>
          <div style={{ textAlign: "center", paddingBottom: "1%" }}>
            <img src={logo} alt="Profile" width="115" height="40" />
          </div>
          <div
            style={{
              backgroundColor: "#FFFFFF",
              height: "45vh",
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
                Create an account or sign in.
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
                      name="email"
                      autoComplete="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <TextField
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      autoComplete="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} style={{ margin: "10px" }}>
                    <Button 
                    variant="contained" 
                    fullWidth
                    sx={{mt:3,mb:2}}
                    onClick={login}>
                      Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <a href="/signup" variant="body2">
                          Not an exsiting User. Sign up
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
