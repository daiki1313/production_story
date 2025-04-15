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

export const Posts = ({posts}) => {

  return (
    <div>
      <PostsList>
          <Grid container spacing={4} justifyContent="center">

            {posts.map((post) => (
              <Grid key={post.id} xs={12} sm={6} md={4}>
                <ItemWrapper>
                  <PostWrapper
                    post={post}
                    onClickPostWrapper={(post) => console.log(post)}
                  />
                </ItemWrapper>
              </Grid>
            ))}
            
          </Grid>
      </PostsList>
    </div>
  );
};
