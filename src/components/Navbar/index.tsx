"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { cartContext } from "@/app/context/cartContext";

const navLinks = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Contact",
    route: "/contact",
  },
  {
    title: "Portfolio",
    route: "/portfolio",
  },
  {
    title: "Available Works",
    route: "/available-works",
  },
  // {
  //   title: "Book",
  //   route: "/book",
  // },
  {
    title: "Log in",
    route: "/login",
  },
];

export default function Navbar() {
  const { cart } = useContext(cartContext);

  const router = useRouter();

  const appBarStyle = {
    backgroundColor: "white",
  };

  const length = cart?.length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar sx={{ flexGrow: 1, backgroundColor: "#eeeff0" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { sm: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, color: "black" }}
          >
            Julie Dietrich Art
          </Typography>
          {navLinks.map((navLink, index) => {
            return (
              <Link key={index} href={navLink.route} passHref>
                <Button sx={{ mx: 2 }} variant="text" className="btn">
                  {navLink.title}
                </Button>
              </Link>
            );
          })}

          <Badge badgeContent={length} color="primary">
            <ShoppingCartIcon
              sx={{ color: "#000" }}
              onClick={() => router.push("/checkout")}
            />
          </Badge>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
