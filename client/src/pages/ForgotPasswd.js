import { useState } from "react";
import { InputField } from "../components/InputField";
import NavBar from "../components/Navbar";
import axios from "axios";

const ForgotPasswd = (props) => {
  const [email, setEmail] = useState("");

  async function forgotPageSubmit(event) {
    event.preventDefault();
  }

  return (
    <div>
      <NavBar />
      <div id={props.theme ? "dark" : "light"} className="forgot-page">
        <div className="forgot-big-div">
          <h1 className="forgot-big-heading">
            Forgot Your Password? No worries it happens.
          </h1>
        </div>
        <div className="forgot-pass-div">
          <h1 className="forgot-div-heading">
            Please Enter your Email Address
          </h1>
          <form onSubmit={forgotPageSubmit}>
            <InputField
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              className="forgot-pass-input form-control"
              placeholder="Email Address"
              label="Email Address"
              min="8"
              max="30"
            />
            <button type="submit" className="btn btn-dark forgot-pass-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswd;
