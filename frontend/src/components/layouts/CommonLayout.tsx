import React from "react"

import { Container} from "@mui/material"
import { styled, Theme } from "@mui/material/styles"
import Grid from '@mui/material/Grid2';

import Header from "components/layouts/Header"

//スタイル
const StyleContainer = styled(Container)(({ theme }) => ({
  marginTop: "3rem"
}));

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <StyleContainer maxWidth="lg">
          <Grid container direction="column"
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}>
            <Grid>
              {children}
            </Grid>
          </Grid>
        </StyleContainer>
      </main>
    </>
  )
}

export default CommonLayout
