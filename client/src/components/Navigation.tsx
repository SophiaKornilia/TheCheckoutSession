import { NavLink } from "react-router-dom";
import "../index.css";
import { useUser } from "../context/UserContext";
import { Logout } from "./Logout";
import { Payment } from "./Payment";

export const Navigation = () => {
  const { user } = useUser();
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">
              <button>Home</button>
            </NavLink>
          </li>
          <li>
            {user ? (
              <Logout />
            ) : (
              <NavLink to="/login">
                <button>Login</button>
              </NavLink>
            )}
          </li>
          <li>
            <Payment />
          </li>
        </ul>
      </nav>
    </>
  );
};
