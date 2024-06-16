import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext/UserContext";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: { mode: "light" },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <ToastContainer autoClose={3000} position="top-center" />
        <UserProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            
          </Routes>
        </UserProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;
