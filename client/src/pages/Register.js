import "./Style.css";
import { RegInputForm } from "../components/RegInputForm";
import NavBar from "../components/Navbar";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  
  const [alertMessage, setAlert] = useState();
  const [count, setCount] = useState(1);
  const navigate = useNavigate();

  async function formSubmit(userInfo) {
    const url = process.env.REACT_APP_REGISTER_API;
    if(count <= 5) {
      axios
      .post(url, userInfo)
      .then(function (response) {
        const {success, data} = response.data;
        if(success){
          alert(data)
          navigate("/")
        }
      })
      .catch(function (err) {
        const {success, error} = err.response.data;
        if(!success){
          setAlert(error)
        }
      });
      setCount(prevVal => prevVal + 1);
    } else if(count > 5) {
      setAlert("Too Many Retries")
    }

  }

  return (
    <div>
      <NavBar />
      <div id={props.theme ? "dark" : "light"} className="reg-page">
        <div className="reg-div">
          <RegInputForm alertMsg={alertMessage} submitClicked={formSubmit} />
        </div>
      </div>
    </div>
  );
};
