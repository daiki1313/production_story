import client from "./client";
import { getToken } from "./auth";

// アイコン更新
export const updateAvatar = async (userId, params) => {
  const headers = getToken();
  return client.patch(`/users/${userId}/update_avatar`, params,{ headers })
}