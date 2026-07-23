import React, { useRef, useState } from "react";
import heic2any from "heic2any";
import axios from "axios";
import {
  UploadCloud,
  FileText,
  Image,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function FileUpload({ onUploaded }) {
  const inputRef = useRef();
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const showMessage = (text, type) => {
    setMsg(text);
    setMsgType(type);

    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 3000);
  };
  const processFile = async (selectedFile) => {
    if (!selectedFile) return;

    let finalFile = selectedFile;

    const ext = selectedFile.name.split(".").pop().toLowerCase();

    if (ext === "heic") {
      try {
        const convertedBlob = await heic2any({
          blob: selectedFile,
          toType: "image/jpeg",
        });

        finalFile = new File(
          [convertedBlob],
          selectedFile.name.replace(/\.heic$/i, ".jpg"),
          {
            type: "image/jpeg",
          }
        );
      } catch (err) {
        showMessage("Failed to convert HEIC image.");
        return;
      }
    }

    setFile(finalFile);

    if (finalFile.type.startsWith("image")) {
      setPreviewUrl(URL.createObjectURL(finalFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleChange = (e) => {
    processFile(e.target.files[0]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];

    processFile(droppedFile);
  };

  const uploadFile = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUploaded(res.data);

      showMessage("File uploaded successfully.");

      setFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.log(err);
      showMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {msg && (
        <div
          className={`p-4 rounded-xl font-medium text-center transition-all ${msgType === "success"
            ? "bg-green-100 border border-green-300 text-green-700"
            : "bg-red-100 border border-red-300 text-red-700"
            }`}
        >
          {msg}
        </div>
      )}
      {/* Upload Box */}

      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-indigo-400 rounded-2xl bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer p-10 flex flex-col items-center"
      >
        <UploadCloud
          className="text-indigo-600 mb-4"
          size={60}
        />

        <h2 className="text-xl font-bold">
          Drag & Drop File Here
        </h2>

        <p className="text-gray-500 mt-2">
          or click to browse your files
        </p>

        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={handleChange}
        />
      </div>

      {/* File Card */}

      {file && (
        <div className="bg-white border rounded-2xl shadow-md p-5">

          <div className="flex items-center gap-4">

            {file.type.startsWith("image") ? (
              <Image
                size={45}
                className="text-green-600"
              />
            ) : (
              <FileText
                size={45}
                className="text-red-600"
              />
            )}

            <div>

              <h3 className="font-bold">
                {file.name}
              </h3>

              <p className="text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

          </div>

          {/* Preview */}

          {previewUrl && (
            <img
              src={previewUrl}
              alt="preview"
              className="mt-6 rounded-xl border w-full max-h-80 object-contain"
            />
          )}

          {!previewUrl &&
            file.type === "application/pdf" && (
              <div className="mt-5 bg-red-50 rounded-xl p-5 text-center">

                <FileText
                  className="mx-auto text-red-600"
                  size={55}
                />

                <p className="mt-2">
                  PDF selected successfully
                </p>

              </div>
            )}

          {/* Upload Button */}

          <button
            disabled={uploading}
            onClick={uploadFile}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition flex justify-center items-center gap-3"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <CheckCircle />
                Upload File
              </>
            )}
          </button>

        </div>
      )}
    </div>
  );
}