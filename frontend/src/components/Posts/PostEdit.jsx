import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from 'lib/api/post';
import { AuthContext } from 'App';
import { TextField, Button, Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, CircularProgress} from '@mui/material';
import { ImageUpload } from 'components/utils/ImageUpload';

export const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [useTool, setUseTool] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const radioButtons = [
    { label: "歌ってみた", value: "cover" },
    { label: "オリジナル", value: "original" },
  ];

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        if (!id) throw new Error("Post ID is missing");
        const response = await getPost(id);
        const postData = response.data;

        setTitle(postData.title);
        setUseTool(postData.useTool);
        setContent(postData.content);
        setCategory(postData.category);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [id, setLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!id) throw new Error("Post ID is missing");

      const formData = new FormData();
      formData.append("post[title]", title);
      formData.append("post[useTool]", useTool);
      formData.append("post[content]", content);
      formData.append("post[category]", category);
      if (image) {
        formData.append("post[image]", image);
      }

      await updatePost(id, formData);
      navigate(`/posts/${id}`);
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>

      <Box mb={3} display="flex" justifyContent="space-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="secondary">Topページへ</Button>
        </Link>
        <Link to={`/posts/${id}`} style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="secondary">前のページへ</Button>
        </Link>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" variant="body1">
          Error: {error.message}
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="タイトル"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              margin="normal"
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="使用機材"
              fullWidth
              variant="outlined"
              value={useTool}
              onChange={(e) => setUseTool(e.target.value)}
              required
              margin="normal"
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="本文"
              fullWidth
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              multiline
              rows={12}
              margin="normal"
            />
          </Box>

          <Box mb={2}>
            <FormControl component="fieldset">
              <FormLabel component="legend">カテゴリー</FormLabel>
              <RadioGroup
                row
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {radioButtons.map((radio) => (
                  <FormControlLabel
                    key={radio.value}
                    value={radio.value}
                    control={<Radio />}
                    label={radio.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>

          <Box mb={2}>
            <ImageUpload setImage={setImage} image={image}/>
          </Box>

          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              style={{ width: '200px' }}
            >
              更新
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};
