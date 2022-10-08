import { Route, Redirect } from "react-router-dom";

const PrivateRouter = (props) => {
    const authToken = localStorage.getItem('authToken');
    return authToken ? <Route {...props} /> :  <Redirect to="/" />
}

export default PrivateRouter