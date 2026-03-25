import { useRef } from 'react';
import './ImageUploader.css';

const ImageUploader = ({ onImageSelect }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onImageSelect(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="image-uploader">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      <button 
        className="upload-button"
        onClick={handleButtonClick}
        type="button"
      >
        <div className="upload-icon">📁</div>
        <div className="upload-text">
          <div className="upload-title">UPLOAD EXERCISE IMAGE</div>
          <div className="upload-subtitle">Click to browse your PC</div>
        </div>
      </button>
    </div>
  );
};

export default ImageUploader;