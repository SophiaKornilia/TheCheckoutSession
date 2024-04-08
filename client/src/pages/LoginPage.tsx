import { Link } from "react-router-dom";
import { Login } from "../components/Login";


export const LoginPage = () => {
  return (
    <div>
      <h1>LoginPage</h1>
      <Login />
      <Link to="/register">Register</Link>
    </div>
  );
};
