import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import axios from "axios";

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
}
const Navbar = ({ loggedIn, setLoggedIn, setEmail }: Props) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  function logout() {
    const url = `${import.meta.env.VITE_API_URL}/logout`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.logout) {
          setLoggedIn(false);
          setEmail("");
          alert("Logged Out");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="flex gap-6 text-md items-center ">
          <ModeToggle />
          {loggedIn ? (
            <>
              <Link
                to="/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <button
                className="text-muted-foreground transition-colors hover:text-primary"
                onClick={logout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Home
              </Link>
              <Link
                to="/login"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
