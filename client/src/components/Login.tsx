import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<string>(""); //lyft upp för att den ska veta om vi är inloggade. 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handelInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handelInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
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
        // setIsLoggedIn(true);
        navigate('/')
      } else {
        setUser("");
      }
    } catch (error) {
      console.error("Error logged in", error);
    }
  };
 
  return (
    <div>
      <h1>{user ? "INLOGGAD" + user : "UTLOGGAD"}</h1> 
      <label htmlFor="email">Email</label>
      <input id="email" type="email" onChange={handelInputEmail} />
      <br />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" onChange={handelInputPassword} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};