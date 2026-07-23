import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import PrintOptions from '../components/PrintOptions';
import API from '../services/api';

export default function Shop() {
  const [uploaded, setUploaded] = useState(null);
  const [options, setOptions] = useState({
    paperType: 'A4',
    color: 'Color',
    copies: 1,
  });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  const showMessage = (text, type) => {
    setMsg(text);
    setMsgType(type);

    setTimeout(() => {
      setMsg("");
      setMsgType("");
    }, 3000);
  };
  const calculatePrice = (opts) => {
    const base = opts.paperType === 'A3' ? 50 : 20;
    const color = opts.color === 'Color' ? 30 : 0;
    return (base + color) * opts.copies;
  };

  const handleAddToCart = async () => {
    if (!uploaded) return showMessage('Please upload a file first!');

    const item = {
      fileUrl: uploaded.url || uploaded.Location,
      filename: uploaded.key || uploaded.name,
      ...options,
      price: calculatePrice(options),
    };

    try {
      await API.post('/cart', item, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      showMessage('Added to cart!');

    } catch (err) {
      console.error(err);
      showMessage('Failed to add to cart');
    }
  };
  const renderPreview = () => {
    if (!uploaded) return null;

    const url = uploaded.url || uploaded.Location;
    const filename = uploaded.key || uploaded.name;
    const ext = filename.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext)) {
      return <img src={url} alt={filename} className="w-48 h-48 object-contain mt-4 border" />;
    } else if (ext === 'pdf') {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-4 block">
          Preview PDF
        </a>
      );
    } else if (['doc', 'docx'].includes(ext)) {
      return (
        <a href={url} download className="text-green-600 mt-4 block">
          Download Word Document
        </a>
      );
    } else if (ext === 'heic') {
      return <p className="text-red-600 mt-4">HEIC file uploaded. Convert to JPG/PNG for preview.</p>;
    } else {
      return <p className="mt-4">File uploaded. Preview not available for this type.</p>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
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
      <h1 className="text-3xl font-bold text-center mb-6">Shop & Customize Your Print</h1>
      <div className="bg-white shadow-md rounded-lg p-6 grid md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Upload Your File</h2>
          <FileUpload onUploaded={setUploaded} />
          {uploaded && (
            <div className="mt-4 text-green-600 font-medium">
              Uploaded: {uploaded.key || uploaded.url}
            </div>
          )}
          {renderPreview()}
        </div>

        <div className="border p-4 rounded-md bg-gray-50">
          <h2 className="text-xl font-semibold mb-3">Print Options</h2>
          <PrintOptions values={options} onChange={setOptions} />
          <div className="mt-4 font-semibold">Price: ₹{calculatePrice(options)}</div>
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
