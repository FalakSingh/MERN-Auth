import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  const { isLogged, authToken } = props.loginResponse;
  if (authToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default PrivateRoute;
