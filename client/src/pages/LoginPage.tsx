import { Link } from "react-router-dom";
import { Login } from "../components/Login";


export const LoginPage = () => {
  return (
    <div>
      <Login />
      <Link to="/register">Register</Link>
    </div>
  );
};
