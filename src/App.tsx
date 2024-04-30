// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
// import Navbar from "@/components/Nav";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <ThemeProvider
      defaultTheme="dark"
      storageKey="vite-ui-theme"
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
