import { Link } from "react-router-dom";

export default function RegHere() {

//  const navigate = useNavigate();
//  function navigateToReg(event) {
//   event.preventDefault();
//   navigate("/register")
//    }

  return (
    <div className="register">
      <p>
        Don't have an account?{" "}
        <Link className="reg-here" to="/register">Register Here</Link>
      </p>
    </div>
  );
}
