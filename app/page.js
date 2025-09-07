"use client";

import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const [modelFile, setModelFile] = useState(null);
  const [modelUrl, setModelUrl] = useState("");
  const [pageUrl, setPageUrl] = useState("");

  // When user selects a file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".glb")) {
      setModelFile(file);
      const url = URL.createObjectURL(file); // Temporary browser URL
      setModelUrl(url);
      setPageUrl(window.location.href); // Current page URL for QR
    } else {
      alert("Please select a valid .glb file");
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "#111", color: "white", padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
        Dynamic AR Model Viewer
      </h1>

      {/* File uploader */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input type="file" accept=".glb" onChange={handleFileChange} />
      </div>

      {/* Show 3D Model if selected */}
      {modelUrl && (
        <model-viewer
          src={modelUrl}
          ar
          ar-modes="scene-viewer webxr quick-look"
          camera-controls
          auto-rotate
          style={{ width: "100%", height: "500px", background: "#222" }}
        ></model-viewer>
      )}

      {/* QR Code */}
      {modelUrl && pageUrl && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Scan on your phone to view AR:</h2>
          <QRCodeCanvas
            value={pageUrl}
            size={180}
            bgColor="#fff"
            fgColor="#000"
          />
        </div>
      )}

      {/* Load model-viewer */}
      <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
    </main>
  );
}
 
