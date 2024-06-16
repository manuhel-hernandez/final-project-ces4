import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  const localUser = "juanitaporfin@terminamos.com";
  const localPassword = "12345678";

  useEffect(() => {}, []);

  const login = (username, password) => {
    if (localUser == username && localPassword == password) {
      window.location.href = "/#/dashboard";
    } else {
      toast.warning("¡Usuario o contraseña incorrecta!");
    }
  };

  const logout = () => {
    window.location.href = "/#/";
    toast.success("¡Cierre de sesión exitoso!");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Error de uso en useUser.");
  }
  return context;
};
