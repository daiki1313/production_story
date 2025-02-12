import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CommonLayout from "components/layouts/CommonLayout";
import Home from "components/pages/Home";
import SignUp from "components/pages/SignUp";
import SignIn from "components/pages/SignIn";

import { getCurrentUser } from "lib/api/auth";
import { PostCreate } from "components/Posts/PostCreate";
import { Posts } from "components/Posts/Posts";
import { Post } from "components/Posts/Post";
import { PostEdit } from "components/Posts/PostEdit";

// グローバルで扱う変数・関数
export const AuthContext = createContext({
  loading: true,
  setLoading: () => {},
  isSignedIn: false,
  setIsSignedIn: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
});

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  // 認証済みのユーザーがいるかどうかチェック
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
        console.log(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser }}>
      <BrowserRouter>
        <CommonLayout>
          <Routes>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />

            <Route path="/" element={<Home />} />
            <Route path="/users/:userId" element={<UserPosts />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/posts/create" element={<PostCreate />} />
            <Route path="/posts/:id/edit" element={<PostEdit />} />
          </Routes>
        </CommonLayout>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
