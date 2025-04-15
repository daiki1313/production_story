import styled from "@emotion/styled";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import sampleImg from "../../images/no_image_yoko.jpg";
import userNoImg from "../../images/kkrn_icon_user_1.png";
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
          onClick={() => navigate(`/posts/${post.id}`)} 
          sx={{
            width: '100%',
            objectFit: 'cover'
          }}
        />
        <StyleTypography variant="h6">{post.category}</StyleTypography>
      </Box>

      <CardContent >
        <Typography 
          sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
          }}
        onClick={() => navigate(`/posts/${post.id}`)} >{post.title}</Typography>

        <Typography variant="body2"
        sx={{
          color: 'text.secondary',
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          whiteSpace: 'normal',
           }}>{post.content}</Typography>
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
            <img src={userNoImg} 
              alt="No Avatar" 
              onClick={() => navigate(`/users/${post.userId}`)}
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          )}

          <Typography sx={{ marginLeft: 2 }} variant="body1" onClick={() => navigate(`/users/${post.userId}`)}>
            {post.userName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
