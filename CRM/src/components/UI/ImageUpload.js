// src/components/UI/ImageUpload.js
import React, { useState } from "react";

function ImageUpload({ onImageAdded }) {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState("");

  const handlePreview = () => {
    if (url) {
      setPreview(url);
    }
  };

  const handleAdd = () => {
    if (preview) {
      onImageAdded(preview);
      setUrl("");
      setPreview("");
    }
  };

  const handleMockCamera = () => {
    // Simular captura de câmera com uma imagem aleatória
    const mockImages = [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    ];
    const randomImage =
      mockImages[Math.floor(Math.random() * mockImages.length)];
    setPreview(randomImage);
  };

  return (
    <div className="image-upload">
      <div className="upload-options">
        <button type="button" onClick={handleMockCamera}>
          Capturar da Câmera
        </button>
        <span>ou</span>
        <div className="url-input">
          <input
            type="text"
            placeholder="Cole a URL da imagem"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="button" onClick={handlePreview}>
            Visualizar
          </button>
        </div>
      </div>

      {preview && (
        <div className="preview">
          <img src={preview} alt="Preview" />
          <button type="button" onClick={handleAdd}>
            Adicionar esta Imagem
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
