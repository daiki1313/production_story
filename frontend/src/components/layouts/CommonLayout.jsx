import React from "react";

import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid';

import Header from "components/layouts/Header";

// スタイル
const StyleContainer = styled(Container)(({ theme }) => ({
  marginTop: "3rem",
}));

const CommonLayout = ({ children }) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <StyleContainer maxWidth="lg">
          <Grid container direction="column" sx={{ justifyContent: "center", alignItems: "center" }}>
            <Grid>
              {children}
            </Grid>
          </Grid>
        </StyleContainer>
      </main>
    </>
  );
};

export default CommonLayout;
