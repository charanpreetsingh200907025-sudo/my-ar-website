"use client";
import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  // File inside "public/models"
  const fileUrl = "/models/coffee_cup.glb";

  return (
    <main style={{ minHeight: "100vh", background: "#111", color: "white", padding: "20px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
        AR Model Viewer
      </h1>

      {/* Show 3D Model */}
      <model-viewer
        src={fileUrl}
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        auto-rotate
        style={{ width: "100%", height: "500px", background: "#222" }}
      ></model-viewer>

      {/* Show QR Code */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2>Scan on your phone:</h2>
        <QRCodeCanvas value={window.location.origin + fileUrl} size={180} bgColor="#fff" fgColor="#000" />
      </div>

      {/* Load Google's model-viewer script */}
      <script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      ></script>
    </main>
  );
}
