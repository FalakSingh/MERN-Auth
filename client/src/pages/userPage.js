import axios from "axios";
import { useState, useEffect } from "react";

const UserPage = (props) => {
  useEffect(() => {
    const authToken = window.localStorage.getItem("authToken") 
    const isLogged = window.localStorage.getItem("isLogged")
    // if (authToken) {
    //   const userContent = async () => {
    //     await axios.get(url)
    //   }
    // }
    return () => {
    };
  }, []);

  return (
    <div>
      <h1>userContentPage</h1>
    </div>
  );
};

export default UserPage;
