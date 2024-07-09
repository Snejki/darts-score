import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
  return (
    <Navbar position="static">
      <NavbarBrand>DARTS</NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem>
          <Link>Play</Link>
        </NavbarItem>
        <NavbarItem>
          <Link>Players</Link>
        </NavbarItem>
        <NavbarItem>
          <Link>History</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
