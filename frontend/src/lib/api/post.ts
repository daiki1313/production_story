import { PostCreateParams, PostUpdateParams, } from "interfaces";
import client from "./client";
import Cookies from "js-cookie";
import { getToken } from "./auth";

// 記事投稿
export const postPost = async (params: PostCreateParams) => {
  const headers = getToken();
  return client.post("/posts", params ,{ headers })
}

// 記事表示
export const getPost = async (id: string) => {
  return client.get(`/posts/${id}`)
}

//記事編集
export const updatePost = async (id: string, params: PostUpdateParams) => {
  const headers = getToken();
  return client.put(`/posts/${id}`, params, { headers })
}

//記事削除
export const deletePost = async (id: string) => {
  const headers = getToken();
  return client.delete(`/posts/${id}`, { headers })
}

//記事一覧
export const getPosts = async () => {
  return client.get("/posts")
}

