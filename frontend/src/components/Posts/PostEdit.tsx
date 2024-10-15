import { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getPost, updatePost } from "lib/api/post";
import { AuthContext } from "App";
import { Radio } from "interfaces";

export const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext)
  const [error, setError] = useState<Error | null>(null);

  const [title, setTitle] = useState<string>("");
  const [useTool, setUseTool] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

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

  const fetchPostData = async () => {
    try {
      if (!id) throw new Error("Post ID is missing");
      const response = await getPost(id);
      const postData = response.data;

      setTitle(postData.title);
      setUseTool(postData.useTool);
      setContent(postData.content);
      setCategory(postData.category);
      setUserName(postData.userName);

    } catch (error) {
      if (error instanceof Error) {
        setError(error); // Errorインスタンスであればそのまま設定
      } else {
        setError(new Error("Unknown error occurred")); // その他のエラーに対するデフォルトメッセージ
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
        const updatedPostData = {
          title,
          useTool,
          content,
          category,
        };

      if (!id) throw new Error("Post ID is missing");
      await updatePost(id, updatedPostData);
      navigate(`/posts/${id}`);

    } catch (error) {
        if (error instanceof Error) {
            setError(error);
        } else {
            setError(new Error("Unknown error occurred"));
        }
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <h2>投稿編集</h2>
      <div>
        <Link to={`/`}>Topページに戻る</Link>
      </div>
      <div>
        <Link to={`/posts/${id}`}>前のページに戻る</Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>UseTool:</label>
            <input type="text" value={useTool} onChange={(e) => setUseTool(e.target.value)} required />
          </div>
          <div>
            <label>Content:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>

          <div>
            {radioButtons.map(radio => {
                return (
                  <div className="col-4">
                      {/* checked属性に式を定義する */}
                      <input className="form-check-input" type="radio"
                          value={radio.value} checked={radio.value === category} onChange={(e) => setCategory(e.target.value)} required/>
                      <label className="form-check-label">
                          <span className="fs-6">{radio.label}</span>
                      </label>
                  </div>
                )
            })}
          </div>

          <button type="submit">更新</button>
        </form>
      )}
    </div>
  );
};