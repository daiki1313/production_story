import { useState,useContext } from "react";
import { AuthContext } from "App";
import { updateAvatar } from "lib/api/avatar";

export const AvatarUpload = ({ userId }) => {
  const [avatar, setAvatar] = useState(null);
  const {setLoading} = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
        const avatarUrl = new FormData();
        avatarUrl.append("avatar", avatar);

        await updateAvatar(userId,avatarUrl);

    } catch (error) {
      setError(error instanceof Error ? error : new Error("Unknown error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button type="submit">アイコンを更新</button>
    </form>
  );
}