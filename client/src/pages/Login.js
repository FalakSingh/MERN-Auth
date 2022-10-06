import "./Style.css";
import InputFields from "../components/LoginInputForm";
import RegHere from "../components/RegHere";
import NavBar from "../components/Navbar";
import ThemeButton from "../components/ThemeButton";

function Login(props) {
  function handleSubmit(credentials) {
    const url = "http://localhost:3001/login";
    props.postRqst(url, credentials);
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
          <InputFields handleSubmit={handleSubmit} />
          <RegHere />
        </div>
      </div>
    </div>
  );
}

export default Login;
