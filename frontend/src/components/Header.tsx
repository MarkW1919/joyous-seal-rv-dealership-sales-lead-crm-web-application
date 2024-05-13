import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useSignOutMutation from "@/backengine/hooks/useSignOutMutation";

const Header = () => {
  const { signOut } = useSignOutMutation();

  const token = localStorage.getItem("engine-token");

  if (token) {
    return (
      <header className="h-28 text-gray-800 bg-white border-b px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your App</h1>
        <Button onClick={signOut}>Sign out</Button>
      </header>
    );
  }

  return (
    <header className="h-28 text-gray-800 bg-white border-b px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Your App</h1>
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem className="space-x-8">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

export default Header;
