import { useState } from "react";

export const Login = () => {
  const [user, setUser] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      <div></div>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" onChange={handelInputEmail} />
      <br />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" onChange={handelInputPassword} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};
