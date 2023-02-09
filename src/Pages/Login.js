import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useLogin } from "../Hook/useLogin";
import PinnaclLogo from '../images/PinnacleLogo.png'

import "../style/Login.css";

const Login = () => {
  const [logName, setusername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const inputEmpatyBtn = () => {
    setusername("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(logName, password);
  };

  return (
    <>
      <section className="login_section">
        <div className="main_div">
          <div className="form_div">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <div className="name_heading">
                  <img src={PinnaclLogo} alt="#" />
                  <p className="from_heading">Pinnacle</p>
                </div>

                <div className="inputs_filds">
                  <p className="heading"> Log in </p>
                  <p className="pera">
                    Please fill your details to access your account.
                  </p>
                  {error && <div className="error">{error}</div>}
                  <div className="input">
                    <div>
                      <label htmlFor="UserName">UserName</label>
                      <FormControl fullWidth variant="outlined">
                        <OutlinedInput
                          id="outlined-adornment-username"
                          type={"text"}
                          onChange={(e) => setusername(e.target.value)}
                          value={logName}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={inputEmpatyBtn}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                sx={{ marginTop: "10px" }}
                              >
                                {<HighlightOffIcon />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div>
                      <label htmlFor="Password">Password</label>
                      <FormControl fullWidth variant="outlined">
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                sx={{ marginTop: "10px" }}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>

                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="Remember me"
                        />
                      </FormGroup>
                    </div>
                    <div>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                        variant="text"
                        className="submitButton"
                      >
                        Log In
                      </Button>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
