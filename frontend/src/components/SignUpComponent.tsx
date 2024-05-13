import useSignUpMutation from "@/backengine/hooks/useSignUpMutation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { toast } from "./ui/use-toast";

const SignUpComponent = () => {
  const { signUp } = useSignUpMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signUp({ email, password });
      toast({
        title: "Sign Up Successful!",
      });
      navigate("/login");
    } catch (error) {
      setError("There was an error signing up.");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="flex flex-col items-center justify-center p-10 space-y-2">
        <h1 className="text-lg font-semibold mb-4">Sign Up</h1>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="grid gap-4 w-full">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <Input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
          />
          <Input
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <Link to="/" className="pt-4 text-gray-400 text-sm hover:underline">
          Go back
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignUpComponent;
