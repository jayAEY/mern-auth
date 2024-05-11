import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_URL}/register`;
    axios
      .post(url, { email, password })
      .then((res) => {
        res.data == `${email} is now registered`
          ? (alert(res.data), navigate("/login"))
          : alert(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="flex items-center justify-center bg-muted min-h-svh w-svw">
      <Card className="max-w-sm max-h-96">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to sign up for an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full"
              >
                Register
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline"
            >
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
