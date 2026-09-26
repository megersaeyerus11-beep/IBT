import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("addiseats-user");

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(
        "addiseats-user",
        JSON.stringify(user)
      );
    } else {
      localStorage.removeItem("addiseats-user");
    }
  }, [user]);

  function login(name) {
    setUser({
      name: name.trim(),
    });
  }

  function logout() {
    setUser(null);
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: Boolean(user),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}