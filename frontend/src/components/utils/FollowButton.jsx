import { userUnFollow,userFollow,getFollowers } from "lib/api/relationship";
import { useState, useEffect,useContext } from "react";
import { AuthContext } from "App";


export const FollowButton = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { loading, setLoading, currentUser } = useContext(AuthContext);

  useEffect(() => {
    // フォロー状態の確認
    const checkFollowingStatus = async () => {
      try {
        const response = await getFollowers(userId);
        const isFollowing = response.data.some((follower) => follower.id === currentUser.id);
        setIsFollowing(isFollowing);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    checkFollowingStatus();
  }, [userId, currentUser]);

  const handleFollowToggle = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        // フォロー解除のリクエスト
        await userUnFollow(userId);
      } else {
        // フォローのリクエスト
        await userFollow(userId);
      }
      setIsFollowing(!isFollowing); // フォロー状態を切り替え
    } catch (error) {
      console.error("Error toggling follow status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleFollowToggle} disabled={loading}>
      {loading ? "処理中..." : isFollowing ? "フォロー解除" : "フォロー"}
    </button>
  );
};
