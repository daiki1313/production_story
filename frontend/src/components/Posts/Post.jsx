import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, deletePost } from "lib/api/post";
import { AuthContext } from "App";
import sampleImg from "../../images/sampleImg1.jpg";
import { Box, Card, CardContent, CardMedia, Button, Typography, CircularProgress } from "@mui/material";

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

  useEffect(() => {
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

    fetchPostData();
  }, [id, setLoading]);

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: 3 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">Error: {error.message}</Typography>
      ) : post ? (
        <Card sx={{ display: 'flex', flexDirection: 'column', marginBottom: 3, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="300"
            image={post.imageUrl ? post.imageUrl : sampleImg}
            alt={post.title}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              使用ツール: {post.useTool}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {post.content}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              カテゴリー: {post.category}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              投稿者:{" "}
              <Button 
                sx={{ textTransform: 'none', padding: 0 }}
                onClick={() => navigate(`/posts/${post.userId}`)}
              >
                {post.userName}
              </Button>
            </Typography>
          </CardContent>

          {/* 編集・削除ボタン */}
          {currentUser?.id === post.userId && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate(`/posts/${id}/edit`)}
              >
                編集
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDelete}
              >
                削除
              </Button>
            </Box>
          )}
        </Card>
      ) : (
        <Typography align="center">投稿が見つかりませんでした。</Typography>
      )}
    </Box>
  );
};
