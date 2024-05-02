import { Link } from "react-router-dom";

const Dashboard = () => {
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
          <Link
            to="/login"
            className="underline"
          >
            Log out
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
