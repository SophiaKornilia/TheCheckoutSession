import { createContext, useState, useContext, PropsWithChildren } from 'react';

interface UserContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children } : PropsWithChildren) => {
  const [user, setUser] = useState<string>("");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
