import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { signUp } from "lib/api/auth";

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

// サインアップ用ページ
const SignUp = () => {
  const navigation = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
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
          <StyleCardHeader title="Sign Up" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={name}
              margin="dense"
              onChange={event => setName(event.target.value)}
            />
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
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <SubmitBtn
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!name || !email || !password || !passwordConfirmation}
              onClick={handleSubmit}
            >
              Submit
            </SubmitBtn>
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

export default SignUp;
