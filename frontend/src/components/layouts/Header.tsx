import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { styled, Theme } from "@mui/material/styles"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person';

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"
import { Drawer, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem } from "@mui/material"

//スタイル
const LinkBtn = styled(Button)
<{ component?: React.ElementType, to?: string}>
(({ theme }) => ({
  textTransform: "none"
}));

const StyleIconBtn = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2)
}));

const StyleTypography = styled(Typography)
<{ component?: React.ElementType, to?: string}>
(({ theme }) => ({
  flexGrow: 1,
  textDecoration: "none",
  color: "inherit"
}));

const Header: React.FC = () => {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const navigation  = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleSignOut = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigation("/signin")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <LinkBtn
              color="inherit"
              onClick={handleMenuOpen}
            >
              <PersonIcon />
            </LinkBtn>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>名前</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                プロフィール
              </MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} to="/config">
                設定
              </MenuItem>
              <MenuItem onClick={(e) => { handleMenuClose(); handleSignOut(e); }}>
                LogOut
              </MenuItem>
            </Menu>
          </>
        )
      } else {
        return (
          <>
            <LinkBtn
              component={Link}
              to="/signin"
              color="inherit"
            >
              Sign in
            </LinkBtn>
            <LinkBtn
              component={Link}
              to="/signup"
              color="inherit"
            >
              Sign Up
            </LinkBtn>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <StyleIconBtn
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </StyleIconBtn>
          
          <StyleTypography
            component={Link}
            to="/"
            variant="h6"
          >
            制作裏話
          </StyleTypography>

          <AuthButtons />

          {/* <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose} PaperProps={{style: {width: '100%'}}}>
            <List sx={{display: 'block'}}>
              <ListItem>
                <ListItemButton onClick={handleDrawerClose} sx = {{textAlign: 'center', borderBottom: "solid 1px #696969"}}>
                  <ListItemText primary={<CloseIcon />} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={handleDrawerClose} sx = {{textAlign: 'center', borderBottom: "solid 1px #696969"}}>
                  <ListItemText primary={"設定"} />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={handleDrawerClose} sx = {{textAlign: 'center', borderBottom: "solid 1px #696969"}}>
                  <ListItemText primary={"aaa"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer> */}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
