import React, { useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Cookies from "js-cookie"

import { styled, Theme } from "@mui/material/styles"

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from '@mui/icons-material/Menu';

import { signOut } from "lib/api/auth"

import { AuthContext } from "App"

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

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
          <LinkBtn
            color="inherit"
            onClick={handleSignOut}
          >
            Sign out
          </LinkBtn>
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
          >
            <MenuIcon />
          </StyleIconBtn>
          
          <StyleTypography
            component={Link}
            to="/"
            variant="h6"
          >
            Sample
          </StyleTypography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
