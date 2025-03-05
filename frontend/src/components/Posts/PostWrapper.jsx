import styled from "@emotion/styled";
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
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

  return (
    
    <Card sx={{ maxWidth: 345 }} onClick={() => onClickPostWrapper(post)}>

      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="194"
          image={sampleImg}
          onClick={() => navigate(`/posts/${post.id}`)} />
        <StyleTypography variant="h6">{post.category}</StyleTypography>
      </Box>

      <CardContent >
        <Typography onClick={() => navigate(`/posts/${post.id}`)} >{post.title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{post.content}</Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "#000000" }} aria-label="recipe" onClick={() => navigate(`/users/${post.userId}`)}>
            R
          </Avatar>
          <Typography sx={{ marginLeft: 2 }} variant="body1" onClick={() => navigate(`/users/${post.userId}`)}>
            {post.userName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
