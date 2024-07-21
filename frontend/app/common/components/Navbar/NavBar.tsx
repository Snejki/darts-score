import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@remix-run/react";

export const NavBar = () => {
  return (
    <NavigationMenu className="bg-white mx-auto min-w-full sticky top-0 left-0 border-2">
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
