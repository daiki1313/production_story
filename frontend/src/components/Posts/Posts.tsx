import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts, postPost } from "lib/api/post";
import { AuthContext } from "App";
import { PostsParams } from "interfaces";

export const Posts = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext)
  const [posts, setPosts] = useState<PostsParams[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchPostData = async () => {
    setLoading(true);
    try {
      const response = await getPosts();
      const postData = response.data;
      setPosts(postData);
      
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
  }, []);

  return (
    <div>
      <h2>投稿一覧</h2>
      <button onClick={() => navigate(`/posts/create`)}>投稿作成</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : posts.length > 0 ? (
        <>
          {posts.map((post) => (
            <div key={post.id}>
              <p>Title: <Link to={`/posts/${post.id}`}>{post.title}</Link></p>
              {/* <p>Content: {post.content}</p> */}
              <p>UserName: {post.userName}</p>
            </div>
          ))}
        </>
      ) : (
        <p>投稿がありません。</p>
      )}
    </div>
  );
};