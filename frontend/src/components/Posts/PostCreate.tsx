import { useContext } from "react"
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { postPost } from 'lib/api/post';
import { AuthContext } from 'App';
import { PostCreateParams, Radio } from "interfaces";

export const PostCreate: React.FC = () => {
  const { currentUser } = useContext(AuthContext)

  const [title, setTitle] = useState<string>('');
  const [useTool, setUseTool] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [category, setCategory] = useState<string>('cover');

  const navigateToPosts = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleUseToolChange = (e: React.ChangeEvent<HTMLInputElement>) => setUseTool(e.target.value);
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => setContent(e.target.value);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value);

  const radioButtons: Radio[] = [
    {
      label: "歌ってみた",
      value: "cover"
    },
    {
      label: "オリジナル",
      value: "original"
    },
  ]

  //api呼び出し
  const postPostFunc = async (post: PostCreateParams) => {
    try {
      await postPost(post);
      navigateToPosts("/");
    } catch (error) {
      console.log(error);
    }
  };

  //投稿ボタン押下際の関数
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      console.error("User not signed in");
      return; // ユーザーがサインインしていない場合は処理を中止
    }

    const newPost: PostCreateParams = {
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
                <div className="col-4">
                    {/* checked属性に式を定義する */}
                    <input className="form-check-input" type="radio"
                        value={radio.value} checked={radio.value === category} onChange={handleCategoryChange}/>
                    <label className="form-check-label">
                        <span className="fs-6">{radio.label}</span>
                    </label>
                </div>
              )
          })}
        </div>

        <button type="submit">作成</button>
      </form>
    </div>
  );
};