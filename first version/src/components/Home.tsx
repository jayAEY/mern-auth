import { Link } from "react-router-dom";

const Home = ({ email }) => {
  return (
    <main className="flex flex-col items-center justify-center w-svw h-svh bg-muted">
      <h1 className="text-7xl">🌮</h1>
      <h1 className="text-7xl font-black border-b-8 border-primary">Hello!</h1>
      {email ? (
        <h1 className="text-7xl font-black border-b-8 border-primary">
          {email}
        </h1>
      ) : (
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="underline"
          >
            Sign up
          </Link>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline"
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
