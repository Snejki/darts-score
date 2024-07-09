import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { NextUIProvider } from "@nextui-org/react";
import { NavBar } from "./common/components/Navbar/NavBar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark text-foreground bg-background">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body >
        <NextUIProvider>
          <NavBar />
            {children}
            <ScrollRestoration />
            <Scripts />
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
