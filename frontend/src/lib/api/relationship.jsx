import client from "lib/api/client"
import { getToken } from "./auth";

//フォロワー取得
export const getFollowers = async (userId) => {
    return client.get(`/users/${userId}/followers`)
}

//フォロー
export const userFollow = async (userId) => {
    const headers = getToken();
    return client.post(`/relationships`, { followed_id: userId }, { headers })
}

//フォロー解除
export const userUnFollow = async (userId) => {
    const headers = getToken();
    return client.delete(`/relationships/${userId}`, { headers })
}