import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useLoginMutation from "@/backengine/hooks/useLoginMutation";
import { Card, CardContent } from "./ui/card";
import { useToast } from "./ui/use-toast";

export default function LoginComponent() {
  const { toast } = useToast();
  const { login } = useLoginMutation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }
    try {
      await login({ email, password });
      toast({
        title: "Login Successful!",
      });
      navigate("/");
    } catch (err) {
      setError("Invalid credentials or error logging in.");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-10 space-y-2">
        <h1 className="text-lg font-semibold mb-4">Login</h1>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form className="flex flex-col gap-4 w-full" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="hover:underline">
            Sign Up
          </Link>
        </p>
        <Link to="/" className="pt-4 text-gray-400 text-sm hover:underline">
          Go back
        </Link>
      </CardContent>
    </Card>
  );
}
