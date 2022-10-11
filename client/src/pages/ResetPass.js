import { InputField } from "../components/InputField";
import NavBar from "../components/Navbar";
import {useState} from "react"
import axios from "axios";

function ResetPass() {
  const url = window.location.href;
  const resetToken = url.split("/").pop();

  const [resetPassword, setResetPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  function handleInput(event) {
    const {name, value} = event.target
    setResetPassword((prevVal) => {
      return{
        ...prevVal,
        [name]:value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (resetPassword.password === resetPassword.confirmPassword) {
      const resetUrl = `process.env.REACT_APP_RESET_API${resetToken}`
      const resetPassBody = {password:resetPassword.password}

      // axios
      // .put(resetUrl, resetPassBody).then().catch



    } else {
        alert("Passwords doesn't match")
      }
    }

  return (
    <div>
      <NavBar />
      <div className="reset-page">
        <form onSubmit={handleSubmit}>
          <div className="reset-div">
            <div className="reset-div-input">
            <InputField
              onChange={handleInput}
              
              type="password"
              min="8"
              max="30"
              placeholder="Password"
              name="password"
            />
            <InputField
              onChange={handleInput}
              
              type="password"
              min="8"
              max="30"
              placeholder="confirmPassword"
              name="confirmPassword"
            />
            </div>
            <button className="btn btn-dark reset-pass-btn reset-pass-btn" type="submit">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
