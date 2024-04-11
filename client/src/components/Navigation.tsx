import { NavLink } from "react-router-dom";
import "../App.css";
import { useUser } from "../confext/UserContext";
import { Logout } from "./Logout";
// import { useCart } from "../confext/CartContext";
import { Payment } from "./Payment";

export const Navigation = () => {
  const { user } = useUser();
  // const { cart } = useCart();
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
          {/* {cart.length > 0 && ( */}
          <li>
            <Payment />
          </li>
          {/* )} */}
        </ul>
      </nav>
    </>
  );
};
