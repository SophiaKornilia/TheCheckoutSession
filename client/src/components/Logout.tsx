import { useUser } from "../context/UserContext";

export const Logout = () => {
  const { setUser } = useUser();
  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.status === 200) {
      setUser("");
      localStorage.clear();
    }
  };
  return <button onClick={handleLogout}>Logout</button>;
};
