import React, { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { styled } from "@mui/material/styles";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

import { signOut } from "lib/api/auth";

import { AuthContext } from "App";
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import HeaderMenu from "./Menu";

// スタイル
const LinkBtn = styled(Button)(({ theme }) => ({
  textTransform: "none",
}));

const StyleIconBtn = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit",
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit",
}));

const Header = () => {
  const { loading, isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const anchorEl = useRef(null);
  const navigation = useNavigate();

  const handleMenuOpen = (e) => {
    anchorEl.current = e.currentTarget;
    console.log(anchorEl.current);
    setOpen(true);
  };

  const handleMenuClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <TitleTypography component={Link} to="/" variant="h6">
            制作裏話
          </TitleTypography>

          {isSignedIn && !loading ? (
            <>
              <HeaderTypography component={Link} to="/posts/create" variant="h6">
                Upload
              </HeaderTypography>

              <HeaderTypography component={Link} to={`/posts/${currentUser?.id}`} variant="h6">
                MyWorks
              </HeaderTypography>

              {/* メニュー */}
              <LinkBtn color="inherit" onClick={handleMenuOpen} ref={anchorEl}>
                <PersonIcon />
              </LinkBtn>

              <HeaderMenu anchorEl={anchorEl.current} open={open} onClose={handleMenuClose} />
            </>
          ) : (
            <>
              <LinkBtn component={Link} to="/signin" color="inherit">
                Sign in
              </LinkBtn>
              <LinkBtn component={Link} to="/signup" color="inherit">
                Sign Up
              </LinkBtn>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
