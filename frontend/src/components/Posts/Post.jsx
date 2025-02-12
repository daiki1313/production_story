import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "lib/api/post";
import { AuthContext } from "App";

export const Post = () => {
  const { loading, setLoading, currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePost(id);
      navigate("/");
    } catch (error) {
        setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostData = async () => {
    setLoading(true);
    try {
      const response = await getPost(id);
      const postData = response.data;
      setPost(postData);
    } catch (error) {
        setError(error);
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
