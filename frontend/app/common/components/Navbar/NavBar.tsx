import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@remix-run/react";
import { GiDart } from "react-icons/gi";

export const NavBar = () => {
  return (
    <NavigationMenu className="bg-white min-w-full w-full sticky top-0 left-0 border-b-2 flex justify-start">
      <GiDart />
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to={""}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Play
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={""}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Players
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={""}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              History
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
