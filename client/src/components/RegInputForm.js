import { useState, useEffect } from "react";
import { InputField } from "../components/InputField";
import { Link } from "react-router-dom";
import { RedAlert } from "../components/alert";

export const RegInputForm = (props) => {
  useEffect(() => {
    if (props.alertMsg) {
      const alertMessage = props.alertMsg;
      setAlert({
        alertVal: "true",
        alertMessage: alertMessage
      });

    }
  }, [props.alertMsg]);

  const [alertObject, setAlert] = useState({
    alertVal: false,
    alertMessage: "",
  });
  const [inputs, setInputs] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  // Setting Input values
  function handleInput(event) {
    setAlert({ alertVal: false, alertMessage: "" });
    const { name, value } = event.target;
    setInputs((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  //Function to handle form submit and check if the passwords are the same.
  function handleSubmit(event) {
    event.preventDefault();
    if (inputs.password === inputs.confirmPass) {
      props.submitClicked(inputs);
    } else {
      setAlert({
        alertVal: true,
        alertMessage: "Passwords doesn't Match",
      });
      setInputs({
        fName: "",
        lName: "",
        email: "",
        password: "",
        confirmPass: "",
      });
    }
  }

  return (
    <div>
      <div className="reg-heading">
        {alertObject.alertVal ? (
          <RedAlert
            className="register-alert"
            alertText={alertObject.alertMessage}
          />
        ) : (
          <h1 className="reg-hello">
            Hello {inputs.fName} {inputs.lName}{" "}
          </h1>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="reg-input-fields">
          <InputField
            onChange={handleInput}
            name="fName"
            type="text"
            placeholder="First Name"
            min="1"
            max="20"
            value={inputs.fName}
          />
          <InputField
            onChange={handleInput}
            name="lName"
            type="text"
            placeholder="Last Name"
            min="1"
            max="20"
            value={inputs.lName}
          />
          <InputField
            onChange={handleInput}
            name="email"
            type="email"
            placeholder="Email Address"
            min="8"
            max="30"
            value={inputs.email}
          />
          <InputField
            onChange={handleInput}
            name="password"
            type="password"
            placeholder="Password"
            min="8"
            max="30"
            value={inputs.password}
          />
          <InputField
            onChange={handleInput}
            name="confirmPass"
            type="password"
            placeholder="Confirm Password"
            min="8"
            max="30"
            value={inputs.confirmPass}
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
