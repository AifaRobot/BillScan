import { useState } from "react";
import './App.css';
import Example1 from './assets/example-1.jpg';
import Example2 from './assets/example-2.jpg';
import Example3 from './assets/example-3.jpg';
import Example4 from './assets/example-4.jpg';
import Loading from './assets/loading.svg';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export function App() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [response, setResponse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Server Error");

      const data = await res.json();

      let str = JSON.stringify(data, null, 2);      
      str = str.replace(/^{\n/, "").replace(/\n}$/, "");
      str = str.split("\n").map(line => line.trim()).join("\n");

      setResponse(str)
    } catch (err) {
      console.error(err);
      setResponse({ error: "The image could not be sent"});
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      uploadImage(file);
    }
  };

  const handleExample = async (example) => {
    setIsOpen(false);
    const response = await fetch(example);
    const blob = await response.blob();
    const file = new File([blob], "example.jpg", { type: blob.type });
    setImage(URL.createObjectURL(file));
    uploadImage(file);
  }

  return (
    <>
      <div className="header">
        <h1>BillScan</h1>
        <hr/>
      </div>
      <div className="pre-body">
        <div className="button example-button" onClick={() => setIsOpen(true)}>Select Example 📑</div>
      </div>
      <div className="body">
        <div className="container">
          <label
            className={`dropzone ${isDragging ? "dragging" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {image ? (
              <img src={image} alt="preview" className="preview" />
            ) : (
              <span>Drag an image or click</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="fileInput"
              onChange={handleFileInput}
            />
          </label>
          {image !== null && (
            <>
             {loading
            ? <div className="loading-response response"><img src={Loading} alt="Logo" /></div>
            : (<pre className="response">{response}</pre>)}
            </>
          )}
         
        </div>
      </div>
      <div className="footer">
        {image === null && (
          <div className="advise">
            ⚠️ This application scans Edesur electricity bills (Argentina) and extracts the fields Customer (Cliente), Meter Number (Medidor), Due Date (Fecha de Vencimiento), and Total Amount (Total)
          </div>
        )}
      </div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Examples</h2>
            <div className="image-grid">
              <img src={Example1} alt="preview" className="preview" onClick={() => handleExample(Example1)} />
              <img src={Example2} alt="preview" className="preview" onClick={() => handleExample(Example2)}  />
              <img src={Example3} alt="preview" className="preview" onClick={() => handleExample(Example3)}  />
              <img src={Example4} alt="preview" className="preview" onClick={() => handleExample(Example4)} />
            </div>
            <div className="button close-button" onClick={() => setIsOpen(false)}>Close</div>
          </div>
        </div>
      )}
    </>
  );
}

export default App
