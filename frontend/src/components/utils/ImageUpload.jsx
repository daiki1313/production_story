import { Button } from '@mui/material';

export const ImageUpload = ({ setImage, image }) => {
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleButtonClick = () => {
    document.getElementById('image-upload').click();
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
      <Button variant="contained" onClick={handleButtonClick}>
        画像を選択
      </Button>

      {image && <img src={URL.createObjectURL(image)} alt="Selected" width="100" />}
    </div>
  );
};
