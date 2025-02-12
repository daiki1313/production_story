import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postPost } from 'lib/api/post';
import { AuthContext } from 'App';

export const PostCreate = () => {
  const { currentUser } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [useTool, setUseTool] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('cover');

  const navigateToPosts = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUseToolChange = (e) => setUseTool(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const radioButtons = [
    {
      label: "歌ってみた",
      value: "cover"
    },
    {
      label: "オリジナル",
      value: "original"
    },
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

    const newPost = {
      userId: currentUser.id,
      title: title,
      useTool: useTool,
      content: content,
      category: category,
    };

    await postPostFunc(newPost);

    setTitle('');
    setUseTool('');
    setContent('');
    setCategory('');
  };

  return (
    <div>
      <h2>投稿作成</h2>
      <div>
        <Link to={`/`}>Topページに戻る</Link>
      </div>
      <div>
        <Link to={`/`}>前のページに戻る</Link>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} required />
        </div>

        <div>
          <label>仕様機材:</label>
          <input type="text" value={useTool} onChange={handleUseToolChange} required />
        </div>

        <div>
          <label>Content:</label>
          <input type="text" value={content} onChange={handleContentChange} required />
        </div>

        <div>
          {radioButtons.map(radio => {
              return (
                <div className="col-4" key={radio.value}>
                    <input className="form-check-input" type="radio"
                        value={radio.value} checked={radio.value === category} onChange={handleCategoryChange} />
                    <label className="form-check-label">
                        <span className="fs-6">{radio.label}</span>
                    </label>
                </div>
              );
          })}
        </div>

        <button type="submit">作成</button>
      </form>
    </div>
  );
};
