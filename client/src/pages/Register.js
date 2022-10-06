import "./Style.css";
import { RegInputForm } from "../components/RegInputForm";
import NavBar from "../components/Navbar";

export const Register = (props) => {
  function formSubmit(userInfo) {
    const url = "http://localhost:3001/register";
    props.postRqst(url, userInfo);
  }

  return (
    <div>
      <NavBar />
      <div id={props.theme ? "dark" : "light"} className="reg-page">
        <div className="reg-div">
          <RegInputForm submitClicked={formSubmit} />
        </div>
      </div>
    </div>
  );
};
