import "./Style.css";
import InputFields from "../components/LoginInputForm";
import RegHere from "../components/RegHere";
import NavBar from "../components/Navbar";
import ThemeButton from "../components/ThemeButton";
import axios from "axios";
import { Link } from "react-router-dom";
import { RedAlert } from "../components/alert";
import { useState } from "react";

function Login(props) {

  const [responseAlert, setResponseAlert] = useState()


  async function handleSubmit(credentials) {
    const url = process.env.REACT_APP_LOGIN_API;
    axios
      .post(url, credentials)
      .then(function (response) {
        console.log(response.response.data);
        // console.clear();
      })
      .catch(function (err) {
        const{success, error} = err.response.data
        // console.clear();
        if(!success){
          handleRes(error)
        }
      });
  }

  function handleRes(errorResponse) {
    setResponseAlert(<RedAlert className="login-alert" alertText={errorResponse} />)
  }

  return (
    <div>
      <NavBar />
      <div id={props.theme ? "dark" : null} className="login-page">
        <div className="login-div">
          <ThemeButton
            themeChange={(themeSwitch) => {
              props.themeInput(themeSwitch);
            }}
          />
          <h1 className="sign-in-here">LOGIN HERE</h1>
          {responseAlert}
          <InputFields handleSubmit={handleSubmit} />
          <div className="forgot-password">
            <Link className="forgot-pass" to="/forgotPasswd">
              Forgot Password?
            </Link>
          </div>
          <RegHere />
        </div>
      </div>
    </div>
  );
}

export default Login;
