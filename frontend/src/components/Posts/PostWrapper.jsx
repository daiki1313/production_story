import styled from "@emotion/styled";
import { Avatar, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import sampleImg from "../../images/sampleImg1.jpg";
import { useNavigate } from "react-router-dom";

const StyleTypography = styled(Typography)`
  position: absolute;
  top: 8px;
  left: 8px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 4px;
`;

export const PostWrapper = ({ post, onClickPostWrapper }) => {

  const navigate = useNavigate();

  const imageUrl = post.imageUrl ? post.imageUrl : sampleImg;

  return (
    
    <Card sx={{ maxWidth: 345 }} onClick={() => onClickPostWrapper(post)}>

      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          onClick={() => navigate(`/posts/${post.id}`)} />
        <StyleTypography variant="h6">{post.category}</StyleTypography>
      </Box>

      <CardContent >
        <Typography onClick={() => navigate(`/posts/${post.id}`)} >{post.title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{post.content}</Typography>
      </CardContent>
      
      <CardContent>
        <Box display="flex" alignItems="center">

          {post.userAvatar ? (
            <img src={post.userAvatar} 
              alt="User Avatar" 
              onClick={() => navigate(`/users/${post.userId}`)}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          ) : (
            // アイコン未設定⇒初期アイコン表示
            <Avatar sx={{ bgcolor: "#000000" }} aria-label="recipe" onClick={() => navigate(`/users/${post.userId}`)}>
            R
            </Avatar>
          )}

          <Typography sx={{ marginLeft: 2 }} variant="body1" onClick={() => navigate(`/users/${post.userId}`)}>
            {post.userName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
