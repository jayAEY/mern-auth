import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import axios from "axios";

const Navbar = ({ loggedIn, setLoggedIn, setEmail }) => {
  const navigate = useNavigate();
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
          {/* {(loggedIn)? (<Link
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
          </Link>)
          :(
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
          </Link>)} */}
        </nav>
      </header>
    </>
  );
};

export default Navbar;

// import react from "react"
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <header></header>
//     // <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
//     // <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
//       {/* <Link
//         to="/"
//         className="flex items-center gap-2 text-lg font-semibold md:text-base"
//       >
//         <span className="sr-only">Acme Inc</span>
//       </Link> */}
//       {/* <Link
//         to="/"
//         className="text-muted-foreground transition-colors hover:text-foreground"
//       >
//         Dashboard
//       </Link> */}
//     // </nav>
//     // </header>
//   );
// };

// export default Navbar;
