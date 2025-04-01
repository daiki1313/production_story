import { useContext, useEffect, useState } from "react";
import { AuthContext } from "App";
import { Posts } from "components/Posts/Posts";
import { useParams } from "react-router-dom";
import { getUserPosts } from "lib/api/post";
import { FollowButton } from "components/utils/FollowButton";
import { AvatarUpload } from "components/utils/AvatarUpload";
import { Avatar} from "@mui/material";


export const UserPosts = () => {

  const { loading, setLoading, currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  const [posts, setPosts] = useState([]);


  useEffect(() => {
    console.log('useEffectが実行されました');
    const fetchPostData = async () => {
      setLoading(true);
      try {
        //投稿データの取得
        const response = await getUserPosts(userId);
        console.log('APIレスポンス:', response);
        const postData = response.data.posts;
        setPosts(postData);

        //フォロー、フォロワー数取得
        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);  

        setUserName(response.data.userName);
        setUserAvatar(response.data.userAvatar);

      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error occurred"));
        console.error('API呼び出し中にエラーが発生しました:', error);  // エラーログを追加
      }finally{
        setLoading(false);
      }
    };
    //実行
    fetchPostData();
  }, [userId, setLoading]);

  // フォロワー数の更新
  const handleFollowChange = (delta) => {
    setFollowerCount((prevCount) => prevCount + delta);
  };

  return (
    <div>
      {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>

        ) : posts.length > 0 ? (
          <>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              {userAvatar ? (
                <img 
                  src={`http://localhost:3001/${userAvatar}`} 
                  alt="User Avatar" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '8px' }} // 画像の右にスペースを追加
                />
              ) : (
                <Avatar sx={{ bgcolor: "#000000" }} aria-label="recipe" style={{ marginRight: '8px' }}>
                  R
                </Avatar>
              )}

              <h2 style={{ margin: 0 }}>{userName}の投稿</h2> {/* マージンを0にして隙間をなくす */}
            </div>

            {/* アイコンアップロードフォーム */}
            {currentUser && currentUser.id === parseInt(userId) && (
              <AvatarUpload userId={currentUser.id} />
            )}
            
            {/* フォローボタン */}
            {currentUser && currentUser.id !== parseInt(userId) && (
              <FollowButton userId={userId} onFollowChange={handleFollowChange} />
            )}
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
