import styled from "@emotion/styled";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { PostsParams } from "interfaces";
import FavoriteIcon from '@mui/icons-material/Favorite';
import sampleImg from "../../images/sampleImg1.jpg";

interface PostWrapperProps {
  post: PostsParams;
  onClickPostWrapper: (post: PostsParams) => void;
}

const StyleTypography = styled(Typography)`
  position: absolute;
  top: 8px;
  left: 8px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
  border-radius: 4px;
`;

export const PostWrapper: React.FC<PostWrapperProps> = ({
  post,
  onClickPostWrapper,
}) => (

    <Card sx={{ maxWidth: 345 }} onClick={() => onClickPostWrapper(post)}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
            component="img"
            height="194"
            image={sampleImg}
        />
        <StyleTypography variant="h6">{post.category}</StyleTypography>
      </Box>
      <CardContent>
        <Typography>title={post.title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{post.content}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: "#000000" }} aria-label="recipe">
              R
          </Avatar>
          <Typography sx={{ marginLeft: 2 }} variant="body1">
            {post.userName}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  
)