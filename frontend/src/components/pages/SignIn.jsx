import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { signIn } from "lib/api/auth";

//スタイル
const StyleCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400
}));

const StyleCardHeader = styled(CardHeader)(({ theme }) => ({
  textAlign: "center"
}));

const SubmitBtn = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none"
}));

const StyleBox = styled(Box)(({ theme }) => ({
  marginTop: "2rem"
}));

const StyleLink = styled(Link)(({ theme }) => ({
  textDecoration: "none"
}));

// サインイン用ページ
const SignIn = () => {
  const navigation = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      email: email,
      password: password
    };

    try {
      const res = await signIn(params);
      console.log(res);

      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        navigation("/");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <StyleCard>
          <StyleCardHeader title="Sign In" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <SubmitBtn
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!email || !password}
              onClick={handleSubmit}
            >
              Submit
            </SubmitBtn>
            <StyleBox textAlign="center">
              <Typography variant="body2">
                Don't have an account? &nbsp;
                <StyleLink to="/signup">
                  Sign Up now!
                </StyleLink>
              </Typography>
            </StyleBox>
          </CardContent>
        </StyleCard>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid email or password"
      />
    </>
  );
};

export default SignIn;
