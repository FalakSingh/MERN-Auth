import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { Register } from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./Route/PrivateRouter";
import UserPage from "./pages/UserPage";
import ForgotPasswd from "./pages/ForgotPasswd";
import ResetPass from "./pages/ResetPass";


export const themeContext = createContext();

function App() {
  
  useEffect(() => {
    if (window.localStorage.getItem("theme") == null) {
      window.localStorage.setItem("theme", false);
      setTheme(false);
    } else {
      const storedVal =
        window.localStorage.getItem("theme") === "false" ? false : true;
      setTheme(storedVal);
    }
  }, []);

  const [theme, setTheme] = useState();
  const [loginResponse, setLoginResponse] = useState({isLogged:false, authToken:""});
  function themeFunction(themeVal) {
    setTheme(themeVal);
    function storedTheme() {
      const newValue =
        window.localStorage.getItem("theme") === "false" ? true : false;
      window.localStorage.setItem("theme", newValue);
    }

    storedTheme();
  }
  return (
    <themeContext.Provider value={theme}>
      <BrowserRouter>
        <Routes>
        <Route element={<PrivateRouter loginResponse={loginResponse} />} >
        <Route exact path ="/userPage" element={<UserPage />} />
        </Route>
          <Route
            exact
            path="/"
            element={
              <Login
                loginRes={(loginResObj) => {
                  setLoginResponse(loginResObj)
                }}
                themeInput={themeFunction}
                theme={theme}
              />
            }
          />
          <Route
            exact
            path="/register"
            element={<Register theme={theme} />}
          />
          <Route exact path="/forgotPasswd" element={<ForgotPasswd theme={theme} />} />
          <Route exact path="/resetPasswd/:resetToken" element={<ResetPass theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </themeContext.Provider>
  );
}

export default App;
