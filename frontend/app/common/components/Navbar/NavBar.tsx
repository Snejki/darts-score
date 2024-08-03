import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "@remix-run/react";
import { GiDart } from "react-icons/gi";
import { Paths } from "~/common/Paths";

export const NavBar = () => {
  return (
    <NavigationMenu className="bg-background min-w-full w-full border-b-2 border-b-backgroundSecondary sticky top-0 left-0 flex justify-start">
      <GiDart />
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to={Paths.gameType}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Play
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={Paths.players}>
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
