import client from "lib/api/client";
import Cookies from "js-cookie";
import { SignUpParams, SignInParams } from "interfaces/index";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
    return client.post("auth", params)
}

// サインイン（ログイン）
export const signIn = (params: SignInParams)  => {
    return client.post("auth/sign_in", params)
}
  
// サインアウト（ログアウト）
export const signOut = () => {
  const headers = getToken();
  return client.delete("auth/sign_out", { headers }) 
}

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
    //値が存在するか確認
    if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
    const headers = getToken();
    return client.get("auth/sessions", { headers })
}

// トークンをチェックし、取得する関数
export const getToken = () => {
  const accessToken = Cookies.get("_access_token");
  const clientId = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (!accessToken || !clientId || !uid) {
    throw new Error("Authentication tokens are missing");
  }

  return {
    "access-token": accessToken,
    "client": clientId,
    "uid": uid
  };

}