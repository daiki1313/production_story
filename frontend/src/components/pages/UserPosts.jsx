import { useContext, useEffect, useState } from "react";
import { AuthContext } from "App";
import { Posts } from "components/Posts/Posts";
import { useParams } from "react-router-dom";
import { getUserPosts } from "lib/api/post";
import { FollowButton } from "components/utils/FollowButton";


export const UserPosts = () => {

  const { loading, setLoading, currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('useEffectが実行されました');
    const fetchPostData = async () => {
      setLoading(true);
      try {
        //投稿データの取得
        const response = await getUserPosts(userId);
        console.log('APIレスポンス:', response);  // 追加
        const postData = response.data.posts;
        setPosts(postData);

        //フォロー、フォロワー数取得
        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);  

      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error occurred"));
        console.error('API呼び出し中にエラーが発生しました:', error);  // エラーログを追加
      }finally{
        setLoading(false);
      }
    };
    //実行
    fetchPostData();
  }, [userId, setLoading,followerCount,followingCount]);


  return (
    <div>
      {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>

        ) : posts.length > 0 ? (
          <>
            <h2>UserName:</h2>
            {currentUser && currentUser.id !== parseInt(userId) && <FollowButton userId={userId} />}
            <div>
              <p>フォロワー数: {followerCount}</p>
              <p>フォロー数: {followingCount}</p>
            </div>

            <Posts posts={posts}/>
          </>
        ) : (
          <p>投稿がありません。</p>
        )
      }
    </div>
  );
};
