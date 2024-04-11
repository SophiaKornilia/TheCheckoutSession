import { useUser } from "../confext/UserContext";


export const Logout = () => {
  const { user, setUser } = useUser();
  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.status === 200) {
      setUser("");
      localStorage.clear(); 
    }
    console.log(user);
  };
return <button onClick={handleLogout}>Logout</button>
}
