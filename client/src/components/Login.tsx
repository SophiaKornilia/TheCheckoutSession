import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../confext/UserContext";

export const Login = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handelInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handelInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginStatus = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser(data);
        navigate("/");
      } else {
        alert("You must register!")
        setUser("");
      }
    } catch (error) {
      console.error("Error logged in", error);
    }
  };
  console.log(user);
  return (
    <div>
      {/* <h1>{user ? "INLOGGAD" + user : "UTLOGGAD"}</h1> */}
      <label htmlFor="email">Email</label>
      <input id="email" type="email" onChange={handelInputEmail} />
      <br />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" onChange={handelInputPassword} />
      <button onClick={handleLoginStatus}>Login</button>
    </div>
  );
};
