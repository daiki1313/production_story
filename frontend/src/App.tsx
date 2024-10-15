import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import CommonLayout from "components/layouts/CommonLayout"
import Home from "components/pages/Home"
import SignUp from "components/pages/SignUp"
import SignIn from "components/pages/SignIn"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"
import { PostCreate } from "components/Posts/PostCreate"
import { Posts } from "components/Posts/Posts"
import { Post } from "components/Posts/Post"
import { PostEdit } from "components/Posts/PostEdit"

// グローバルで扱う変数・関数
export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  // 認証済みのユーザーがいるかどうかチェック
  // 確認できた場合はそのユーザーの情報を取得
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])


  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        //サインインしてくださいのポップを出すようにする

        return <Navigate to="/signin" />;
      }
    } else {
      return <></>
    }
  }

  return (
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <BrowserRouter>
          <CommonLayout>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              {/* <Route path="/" element={<Private><Home /></Private>} /> */}
              <Route path="/" element={<Posts />} />
              <Route
                path="/posts/:id"
                element={<Post />}
              />
              <Route
                path="/posts/create"
                element={<PostCreate />}
              />
              <Route
                path="/posts/:id/edit"
                element={<PostEdit />}
              />
            </Routes>
          </CommonLayout>
        </BrowserRouter>
      </AuthContext.Provider>
  )
}

export default App
