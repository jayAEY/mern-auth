import { useNavigate } from "react-router-dom";
import axios from "axios";

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
}

const Dashboard = ({ email, setLoggedIn, loggedIn, setEmail }: Props) => {
  axios.defaults.withCredentials = true;
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
    <main className="flex flex-col items-center justify-center w-svw h-svh bg-muted">
      {loggedIn ? (
        <>
          <h1 className="text-7xl">🍔</h1>
          <h1 className="text-7xl font-black border-b-8 border-primary">
            Welcome
          </h1>
          <h1 className="text-7xl font-black border-b-8 border-primary">
            {email}!
          </h1>
          <h2 className="text-2xl font-mono">You are now logged in</h2>
          <div className="text-center text-sm">
            <div className="text-center text-sm">
              Wrong account?{" "}
              <button
                className="underline"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-2xl text-center">Error, you're not logged in❗</h1>
      )}
    </main>
  );
};

export default Dashboard;
