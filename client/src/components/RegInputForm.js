import { useState } from "react";
import { InputField } from "../components/InputField";
import { Link } from "react-router-dom";
import { RedAlert } from "../components/alert";

export const RegInputForm = (props) => {
  const [alertMessage, setAlert] = useState(false);
  const [inputs, setInputs] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  function handleInput(event) {
    const { name, value } = event.target;
    setInputs((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (inputs.password === inputs.confirmPass) {
      props.submitClicked(inputs);
    } else {
      setAlert(true);
    }
  }

  return (
    <div>
      {alertMessage ? (
        <RedAlert alertText="Passwords doesn't Match" />
      ) : (
        <h1 className="reg-hello">
          {" "}
          Hello {inputs.fName} {inputs.lName}{" "}
        </h1>
      )}

      <form onSubmit={handleSubmit}>
        <div className="reg-input-fields">
          <InputField
            onChange={handleInput}
            name="fName"
            type="text"
            placeholder="First Name"
            min="1"
            max="20"
          />
          <InputField
            onChange={handleInput}
            name="lName"
            type="text"
            placeholder="Last Name"
            min="1"
            max="20"
          />
          <InputField
            onChange={handleInput}
            name="email"
            type="email"
            placeholder="Email Address"
            min="8"
            max="30"
          />
          <InputField
            onChange={handleInput}
            name="password"
            type="password"
            placeholder="Password"
            min="8"
            max="30"
          />
          <InputField
            onChange={handleInput}
            name="confirmPass"
            type="password"
            placeholder="Confirm Password"
            min="8"
            max="30"
          />
          <div className="sign-up-btn">
            <button type="submit" className="btn btn-dark">
              Sign Up
            </button>
          </div>
          <Link className="signIn" to="/">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};
