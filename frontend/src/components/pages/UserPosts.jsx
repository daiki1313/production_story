import React, { useContext } from "react";
import { AuthContext } from "App";
import { Posts } from "components/Posts/Posts";
import { useParams } from "react-router-dom";


const UserPosts = () => {

  const { isSignedIn, currentUser } = useContext(AuthContext);
  const { loading, setLoading } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const [posts, setPosts] = useState([]);

  const fetchPostData = async () => {
    setLoading(true);

    try {
      const response = await getUserPosts(id);
      const postData = response.data;
      setPosts(postData);
    } catch (error) {

      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  return (
    <div>
      {loading ? (
          <p>Loading...</p>

        ) : error ? (
          <p>Error: {error.message}</p>

        ) : posts.length > 0 ? (
          <>
            <h2>UserName</h2>
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
