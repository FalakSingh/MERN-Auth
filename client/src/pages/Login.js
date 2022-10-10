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
  const [responseAlert, setResponseAlert] = useState({
    resVal: false,
    resAlert: "",
  });

  async function handleSubmit(credentials) {
    const url = process.env.REACT_APP_LOGIN_API;
    axios
      .post(url, credentials)
      .then(function (response) {
        console.log(response);
        const { success, token } = response.data;
        if (success) {
          alert(token);
        }
      })
      .catch(function (err) {
        const { success, error } = err.response.data;
        if (!success) {
          handleRes(error);
        }
      });
  }

  function handleRes(errorResponse) {
    setResponseAlert({
      resVal: true,
      resAlert: <RedAlert className="login-alert" alertText={errorResponse} />,
    });
    setTimeout(function () {
      setResponseAlert((prevVal) => ({ ...prevVal, resVal: false }));
    }, 3000);
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
          {responseAlert.resVal ? responseAlert.resAlert : null}
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
