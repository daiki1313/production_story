import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "lib/api/post";
import { AuthContext } from "App";
import { PostShowParams } from "interfaces";

export const Post = () => {
  const { loading, setLoading, currentUser } = useContext(AuthContext)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostShowParams>();
  const [error, setError] = useState<Error | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (!id) throw new Error("Post ID is missing");
      await deletePost(id);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("Unknown error occurred"));
      }
    } finally {
      setLoading(false);
    }
  }

  const fetchPostData = async () => {
    setLoading(true);
    try {
        if (!id) throw new Error("Post ID is missing");
        const response = await getPost(id);
        const postData = response.data;
        setPost(postData);
    } catch (error) {
        if (error instanceof Error) {
          setError(error); // Errorインスタンスであればそのまま設定
        } else {
          setError(new Error("Unknown error occurred")); // その他のエラーに対するデフォルトメッセージ
        }
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  return (
    <div>
      <h2>投稿詳細</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : post ? (
        <div>
          <p>Title: {post.title}</p>
          <p>use_tool: {post.useTool}</p>
          <p>Content: {post.content}</p>
          <p>Category: {post.category}</p>
          <p>UserName: {post.userName}</p>
          {/* 投稿編集ボタン */}
          <button
            onClick={() => navigate(`/posts/${id}/edit`)}
            disabled={post.userId !== currentUser?.id} //自分の投稿で無ければ無効
          >
            編集
          </button>
          {/* 投稿削除ボタン */}
          <button 
            onClick={handleDelete}
            disabled={post.userId !== currentUser?.id} //自分の投稿で無ければ無効
          >
            削除
          </button>
        </div>
      ) : (
        <p>投稿がありません。</p>
      )}
    </div>
  );
};