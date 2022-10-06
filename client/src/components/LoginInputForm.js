import {
  VisibilityRounded,
  VisibilityOffRounded,
  LoginOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { InputField } from "./InputField";

export default function LoginInputForm(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showStatus, setStatus] = useState(false);

  function handleInput(event) {
    const { name, value } = event.target;
    setCredentials((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function formSubmit(event) {
    event.preventDefault();
    props.handleSubmit(credentials);
  }

  return (
    <form onSubmit={formSubmit}>
      <div className="login-input-fields">
      <InputField
        onChange={handleInput}
        name="email"
        type="email"
        placeholder="Email Address"
        max="30"
      />
      <InputField
        onChange={handleInput}
        name="password"
        type={showStatus ? "text" : "password"}
        placeholder="Password"
        max="30"
      />
        <span
          onClick={() => {
            setStatus(!showStatus);
          }}
          className="show-icon"
        >
          {showStatus ? <VisibilityRounded /> : <VisibilityOffRounded />}
        </span>
      </div>
      <div className="sign-btn">
        <button type="submit" className="btn btn-dark">
          Sign In
          <span>
            &nbsp;&nbsp;
            <LoginOutlined />
          </span>
        </button>
      </div>
    </form>
  );
}
