import client from "./client";
import { getToken } from "./auth";

// 記事投稿
export const postPost = async (params) => {
  const headers = getToken();
  return client.post("/posts", params ,{ headers })
}

// 記事表示
export const getPost = async (id) => {
  return client.get(`/posts/${id}`)
}

//記事編集
export const updatePost = async (id, params) => {
  const headers = getToken();
  return client.put(`/posts/${id}`, params, { headers })
}

//記事削除
export const deletePost = async (id) => {
  const headers = getToken();
  return client.delete(`/posts/${id}`, { headers })
}

//記事一覧
export const getPosts = async () => {
  return client.get("/posts")
}

//ユーザー記事一覧
export const getUserPosts = async () => {
  return client.get(`/posts/${id}`)
}

