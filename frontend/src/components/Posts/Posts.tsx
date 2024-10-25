import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts, postPost } from "lib/api/post";
import { AuthContext } from "App";
import { PostsParams } from "interfaces";
import styled from "@emotion/styled";
import { PostWrapper } from "./PostWrapper";
import Grid from '@mui/material/Grid2';

const PostsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

export const Posts = () => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext);
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
      <h2>ALL</h2>

      
      <PostsList>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : posts.length > 0 ? (
          <>
          <Grid container spacing={4} justifyContent="center" >
            {posts.map((post) => (
              <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ItemWrapper>
                  <PostWrapper
                    post={post}
                    onClickPostWrapper={(post) => console.log(post)}
                  />
                </ItemWrapper>
              </Grid>
            ))}
            </Grid>
          </>
        ) : (
          <p>投稿がありません。</p>
        )}
      </PostsList>
    </div>
  );
};