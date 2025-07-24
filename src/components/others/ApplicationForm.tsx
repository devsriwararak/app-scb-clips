// components/ApplicationForm.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { isMobile } from "react-device-detect";

export default function ApplicationForm() {
  const [file, setFile] = useState<File | null>(null);
  // สถานะสำหรับข้อมูลฟอร์มอื่นๆ
  const [otherFormData, setOtherFormData] = useState({ name: "" });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      alert("กรุณาแนบรูปภาพ");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", otherFormData.name);
    // เพิ่มข้อมูลอื่นๆ ตามต้องการ

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("อัปโหลดสำเร็จ!");
      } else {
        alert("เกิดข้อผิดพลาดในการอัปโหลด");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input สำหรับข้อมูลอื่นๆ */}
      <div>
        <label htmlFor="name">ชื่อ:</label>
        <input
          type="text"
          id="name"
          value={otherFormData.name}
          onChange={(e) => setOtherFormData({ ...otherFormData, name: e.target.value })}
        />
      </div>

      <div>
        <label htmlFor="file-upload">
          {isMobile ? "ถ่ายรูป" : "แนบรูปภาพ"}
        </label>
        {isMobile ? (
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            capture="environment" // เปิดกล้องหลัง
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        ) : (
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        )}
      </div>

      <button type="submit">ส่งใบสมัคร</button>
    </form>
  );
}