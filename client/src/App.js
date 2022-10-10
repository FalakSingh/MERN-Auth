import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { Register } from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./Route/PrivateRouter";
import userPage from "./pages/userPage";
import ForgotPasswd from "./pages/ForgotPasswd";


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
          {/* <PrivateRouter exact path="/userContent" element={userPage} /> */}
          <Route
            exact
            path="/"
            element={
              <Login
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
        </Routes>
      </BrowserRouter>
    </themeContext.Provider>
  );
}

export default App;
