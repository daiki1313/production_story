import { useState,useContext } from "react";
import { AuthContext } from "App";
import { updateAvatar } from "lib/api/avatar";
import { Button } from '@mui/material';

export const AvatarUpload = ({ userId, setUserAvatar }) => {
  const [avatar, setAvatar] = useState(null);
  const {setLoading} = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUserAvatar(objectUrl);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('image-upload').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
        const avatarUrl = new FormData();
        avatarUrl.append("avatar", avatar);
        await updateAvatar(userId, avatarUrl);

    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        id="image-upload"
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
      />
      <Button variant="contained" onClick={handleButtonClick} style={{ marginRight: '6px'}}>
        アイコンを選択
      </Button>

      {avatar && <p>選択中: {avatar.name}</p>}

      {error && <p style={{ color: "red" }}>{error.message}</p>}

      <Button variant="contained" onClick={handleSubmit}>
        更新
      </Button>
    </div>
  );
}