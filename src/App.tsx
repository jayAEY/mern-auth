import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "./components/theme-provider";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/verify`).then((res) => {
      if (res.data.login === true) {
        setLoggedIn(true);
        setEmail(res.data.email);
      } else {
        setLoggedIn(false);
      }
    });
  }, []);

  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <BrowserRouter>
        <Navbar
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setEmail={setEmail}
        />
        <Routes>
          <Route
            path="/"
            element={<Home email={email} />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={
              <Login
                setDisplayEmail={setEmail}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                email={email}
                setLoggedIn={setLoggedIn}
                loggedIn={loggedIn}
                setEmail={setEmail}
              />
            }
          />
          <Route
            path="/*"
            element={<Home email={email} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
