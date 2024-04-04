import { useState } from "react";
import "./App.css";


function App() {
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newName, setNewName] = useState<string>("");

  const handelInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const handelInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handelInputChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewPassword(e.target.value);
  };

  const handleClick = async () => {
    if (newName === "" || newEmail === "" || newPassword === "") {
      console.log("Fyll i alla fält innan du registrerar.");
      return;
    }
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
        }),
      });

      if (response.ok) {
        console.log("Användare registrerad");
        //tömmer staten
        setNewEmail("");
        setNewPassword("");
        setNewName("");

        //tömmer inputvaluet
        const nameInput = document.getElementById("name") as HTMLInputElement
        const emailInput = document.getElementById("email") as HTMLInputElement
        const passwordInput = document.getElementById("password") as HTMLInputElement

        if (nameInput) nameInput.value = "";
        if (emailInput) emailInput.value = "";
        if (passwordInput) passwordInput.value = "";

      } else {
        console.log("Registreringen misslyckades");
      }
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };

  console.log(newEmail);
  console.log(newPassword);
  console.log(newName);

  return (
    <>
      <h2>Register</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" onChange={handelInputChangeName} />
        <br />
        <label htmlFor="email">Email</label>
        <input id="email" type="email" onChange={handelInputChangeEmail} />
        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          onChange={handelInputChangePassword}
        />
        <br />
        <button id="registerBtn" onClick={handleClick}>Register</button>
      </div>
    </>
  );
}

export default App;
