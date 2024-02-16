import * as React from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./Auth.modules.css";

export default function Auth() {
  const [showLogIn, setShowLogIn] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };
  return (
    <div className="Auth auth-page container">
      {showLogIn ? <Login /> : <Register />}

      <Link onClick={() => setShowLogIn(!showLogIn)}>
        {showLogIn ? (
          // eslint-disable-next-line react/no-unescaped-entities
          <p className="under-form-text">Don't have an account? Register</p>
        ) : (
          <p className="under-form-text">Have an account? Log in</p>
        )}
      </Link>
    </div>
  );
}

// LOGIN COMPONENT
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [prompt, setPrompt] = useState("");

  // set the jwt token 
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // get the received response from the api - the jwt token from the backend
      const response = await axios.post(
        "https://snowbunny-backend.onrender.com/auth/login",
        {
          username,
          password,
        }
      );
      // console.log(response.data.message);
      if (response.data.message) {
        // alert(response.data.message);
        setPrompt(response.data.message);
      }

      if (response.data.token) {
        // set the response to cookie
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userID", response.data.userID);
        window.localStorage.setItem("userName", username);
        // after successful login - redirect to homepage using useNavigate hook
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Log In"
      placeholder="User name"
      onSubmit={onSubmit}
      message="Let's get hopping to your new ski resort vacation!"
      prompt={prompt}
    />
  );
};
// REGISTER COMPONENT
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const [prompt, setPrompt] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    // using axios to make a post request to auth/register api
    // first argument is url, then object for the body of the request
    try {
      const response = await axios.post(
        "https://snowbunny-backend.onrender.com/auth/register",
        {
          username,
          password,
        }
      );
      setPrompt(response.data.message);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      onSubmit={onSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      placeholder="User name"
      label="Sign up"
      message="Create an account to hop over to your next ski destination with confidence."
      prompt={prompt}
    />
  );
};

// Make form generic, it is used for signing up AND signing in
const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  message,
  onSubmit,
  placeholder,
  prompt,
}) => {

  const showPrompt = () => {
    if (prompt === "Your account is created. Please log in.") {
      return (
        <Alert severity="success">
          Account created. <strong>Please log in.</strong>
        </Alert>
      );
    } else if (prompt === "User already exists. Please log in.") {
      return (
        <Alert severity="info">
          This account already exists. <strong>Please log in.</strong>
        </Alert>
      );
    } else if (prompt === "Account does not exist. Please create an account.") {
      return (
        <Alert severity="error">
          Account does not exist. <strong>Please create an account.</strong>
        </Alert>
      );
    } else if (prompt === "Username or password is incorrect.") {
      return (
        <Alert severity="warning">
          Username or password is <strong>incorrect</strong>.
        </Alert>
      );
    }
  };

  return (
    <main className="container main-container">
      {prompt ? (
        <p style={{ paddingBottom: "0", marginBottom: "12px" }}>
          {showPrompt()}
        </p>
      ) : (
        <p></p>
      )}
      <article className="grid">
        <div
          className="form-side"
          style={{
            backgroundImage: `url(https://t4.ftcdn.net/jpg/03/10/02/55/360_F_310025535_K3CIQlg6V7W2MlKtJvtka81kRtA8Ui5e.jpg?w=585&scale=down)`,
          }}
        >
          <hgroup>
            <h1>{label}</h1>
            <p>{message}</p>
          </hgroup>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="login"
              placeholder={placeholder}
              aria-label="Login"
              value={username.charAt(0).toUpperCase() + username.slice(1)}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="secondary">
              {label}
            </button>
          </form>
        </div>
        <div
          style={{
            backgroundImage: `url(https://t4.ftcdn.net/jpg/03/10/02/55/360_F_310025535_K3CIQlg6V7W2MlKtJvtka81kRtA8Ui5e.jpg?w=585&scale=down)`,
          }}
        ></div>
      </article>
    </main>
  );
};
