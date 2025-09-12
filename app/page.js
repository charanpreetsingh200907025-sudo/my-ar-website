"use client";

import { useState } from "react";
import Script from "next/script";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [fileUrl, setFileUrl] = useState("");

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Dynamic AR Model Viewer
      </h1>

      {/* File uploader */}
      <div style={{ marginBottom: "20px" }}>
        <input type="file" accept=".glb,.gltf" onChange={handleFileChange} />
      </div>

      {/* Show 3D Model */}
      {fileUrl && (
        <model-viewer
          src={fileUrl}
          ar
          ar-modes="scene-viewer webxr quick-look"
          camera-controls
          auto-rotate
          style={{ width: "100%", height: "500px", background: "#222" }}
        ></model-viewer>
      )}

      {/* Show QR Code */}
      {fileUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Scan on your phone:</h2>
          <QRCodeCanvas
            value={window.location.origin + fileUrl}
            size={180}
            bgColor="#fff"
            fgColor="#000"
          />
        </div>
      )}

      {/* Load Google's model-viewer script */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js"
      />
    </div>
  );
}

