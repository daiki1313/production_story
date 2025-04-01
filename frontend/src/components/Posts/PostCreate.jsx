import { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { postPost } from 'lib/api/post';
import { AuthContext } from 'App';
import { TextField, Button, Box, InputLabel , Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Input } from '@mui/material';

export const PostCreate = () => {
  const { currentUser } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [useTool, setUseTool] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('cover');
  const [image, setImage] = useState(null);

  const navigateToPosts = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUseToolChange = (e) => setUseTool(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const radioButtons = [
    { label: "歌ってみた", value: "cover" },
    { label: "オリジナル", value: "original" }
  ];

  const postPostFunc = async (post) => {
    try {
      await postPost(post);
      navigateToPosts("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User not signed in");
      return;
    }

    const formData = new FormData();
    formData.append("post[userId]", currentUser.id);
    formData.append("post[title]", title);
    formData.append("post[useTool]", useTool);
    formData.append("post[content]", content);
    formData.append("post[category]", category);
    if (image) {
      formData.append("post[image]", image);
    }

    await postPostFunc(formData);

    setTitle('');
    setUseTool('');
    setContent('');
    setCategory('cover');
    setImage(null);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>

      <Box mb={3} display="flex" justifyContent="space-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="secondary">Top</Button>
        </Link>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="タイトル"
            fullWidth
            variant="outlined"
            value={title}
            onChange={handleTitleChange}
            required
            margin="normal"
          />
        </Box>

        <Box mb={2}>
          <TextField
            label="仕様機材"
            fullWidth
            variant="outlined"
            value={useTool}
            onChange={handleUseToolChange}
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
            onChange={handleContentChange}
            required
            multiline
            rows={4}
            margin="normal"
          />
        </Box>

        <Box mb={2}>
          <FormControl component="fieldset">
            <FormLabel component="legend">カテゴリー</FormLabel>
            <RadioGroup
              row
              value={category}
              onChange={handleCategoryChange}
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
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="image-upload">画像を選択</InputLabel>
            <Input
              id="image-upload"
              type="file"
              onChange={handleImageChange}
              fullWidth
              inputProps={{ accept: "image/*" }}
              margin="normal"
            />
          </FormControl>
        </Box>

        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            style={{ width: '200px' }}
          >
            作成
          </Button>
        </Box>
      </form>
    </div>
  );
};
