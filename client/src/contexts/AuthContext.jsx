import React, {createContext, useState} from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  React.useEffect(() => {
    const getUserFromlocalStrg = JSON.parse(localStorage.getItem("user"));
    if (getUserFromlocalStrg) {
      setUser(getUserFromlocalStrg);
      setIsAuthenticated(true);
    }
    console.log("called useEFFETct from context");
  }, []);
  const login = (email, password) => {
    setUser({email});
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
