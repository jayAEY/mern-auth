import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  function logout() {
    const url = `${import.meta.env.VITE_API_URL}/logout`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.logout) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <main className="flex flex-col items-center justify-center w-svw h-svh bg-muted">
      <h1 className="text-7xl">🍔</h1>
      <h1 className="text-7xl font-black border-b-8 border-primary">
        Welcome!
      </h1>
      <h2 className="text-2xl font-mono">You are now logged in</h2>
      <div className="text-center text-sm">
        <div className="text-center text-sm">
          Wrong account?{" "}
          <button
            type="submit"
            className="underline"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
