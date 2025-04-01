import { useContext, useEffect, useState } from "react";
import { AuthContext } from "App";
import { Posts } from "components/Posts/Posts";
import { getPosts } from "lib/api/post";

const Home = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      try {
        const response = await getPosts();
        const postData = response.data;
        console.log(response);
        setPosts(postData);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error occurred"));
      }
      setLoading(false);
    };

    fetchPostData();
  }, [setLoading]);

  return (
    <div>
      {loading ? (
          <p>Loading...</p>

        ) : error ? (
          <p>Error: {error.message}</p>

        ) : posts.length > 0 ? (
          <>
            <h2>ALL</h2>
            <Posts posts={posts}/>
          </>
        ) : (
          <p>投稿がありません。</p>
        )
      }
    </div>
  );
};

export default Home;
