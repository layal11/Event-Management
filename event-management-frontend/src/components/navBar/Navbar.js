import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "./connect-logo.png";
const pages = [
  { name: "Events", link: "events" },
  // { name: "Pricing",   link: "events" },
  { name: "Connect", link: "connect" },
];
const settings = [
  { name: "Profile", link: "profile" },
  { name: "Home", link: "/" },
  { name: "Logout", link: "/" },
];

const ResponsiveAppBar = () => {
  const user = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [signedIn, setSignedIn] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    setSignedIn(user.loggedIn);
    setName(user.name);
  }, [user.loggedIn, user.name]);
  return (
    <AppBar
      position="static"
      style={{
        background:
          "linear-gradient(90deg, rgba(25,58,125,1) 0%, rgba(67,162,214,1) 92%) !important",
        boxShadow: "unset",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src={logo} style={{ width: "80px", height: "70px" }}></img>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.link}
                    style={{ textDecoration: "unset", color: "white" }}
                  >
                    {page.name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "unset", color: "white" }}
                  to={page.link}
                >
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>
          {signedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{name[0] && name[0] != "" ? name[0] : "U"}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <Link
                    style={{ textDecoration: "unset" }}
                    to={setting.link}
                    key={setting.name}
                    onClick={handleCloseNavMenu}
                  >
                    <MenuItem>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "unset", color: "white" }}
                  to="sign-in"
                >
                  Sign In
                </Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              ></Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
