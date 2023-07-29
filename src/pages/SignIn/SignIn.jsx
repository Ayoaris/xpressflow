import Navbar from "../../components/Navbar/Navbar";
import "./SignIn.scss";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { comparePassword, generateToken, hashPassword } from "../../utils";
toast.configure();

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const { email, password } = formData;
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regex.test(password)) {
      toast.error(
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character",
        {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000,
        }
      );
      return;
    }

    const hash = hashPassword(password, email);

    const user = users.find((user) => user.email === email);

    if (!user) {
      toast.error("Invalid credentials", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    const compare = comparePassword(hash, user.password, email);

    if (!compare || email !== user.email) {
      toast.error("Invalid credentials", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
      });
      return;
    }

    // generate token

    // Math random to large number to large strings

    const token = generateToken();

    localStorage.setItem("token", token);

    toast.success("Login successful", {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 3000,
    });

    navigate("/dashboard");
  };

  return (
    <div className="overall">
      <Navbar />
      <div className="container">
        <div className="form-section">
          <h1>Welcome Back!</h1>
          <p className="p-1">
            Sign in to your Xpress reward partner’s dashboard
          </p>
          <div className="divide"></div>
          <form onSubmit={handleSubmit}>
            <div className="labels" htmlFor="">
              Email Address
            </div>
            <div className="input-fields">
              <Box
                sx={{
                  "& > :not(style)": { m: 0, width: "52ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  onChange={handleChange}
                  id="outlined-basic"
                  value={formData.email}
                  name="email"
                  label=""
                  variant="outlined"
                />
              </Box>
            </div>

            <div className="labels" htmlFor="">
              Password
            </div>
            <div className="input-fields">
              <FormControl
                sx={{
                  m: 0,
                  width: "52ch",
                  md: { m: 0, width: "22ch" },
                  sm: { m: 0, width: "3000px", backgroundColor: "red" },
                  xs: { m: 0, width: "3000px", backgroundColor: "yellow" },
                }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password"></InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  onChange={handleChange}
                  value={formData.password}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label=""
                />
              </FormControl>
            </div>
            <p className=" p-1 p-2">
              Forgot Password? <a href="#">Reset it</a>
            </p>
            <button className="btn">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
