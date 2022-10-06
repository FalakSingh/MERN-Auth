import Login from "./pages/Login";
import { createContext, useEffect, useState } from "react";
import { Register } from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";

export const themeContext = createContext();

function App() {


  function postRequest(url, postBody){
    postBody = JSON.stringify(postBody);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios.post(url, postBody, config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }








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
          <Route
            path="/"
            element={<Login postRqst={postRequest} themeInput={themeFunction} theme={theme} />}
          />
          <Route path="/register" element={<Register postRqst={postRequest} theme={theme} />} />
        </Routes>
      </BrowserRouter>
    </themeContext.Provider>
  );
}

export default App;
