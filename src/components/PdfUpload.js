// src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

const PdfUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('pdf', file);
    formData.append('email', email);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pdf/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>PDF:</label>
          <input type="file" onChange={handleFileChange} accept="application/pdf" required />
        </div>
        <button type="submit">Upload</button>
      </form>
      {responseData && (
        <div>
          <h2>Extracted Data:</h2>
          <p><strong>Title:</strong> {responseData.title}</p>
          <p><strong>Email:</strong> {responseData.email}</p>
          <p><strong>Content:</strong> {responseData.content}</p>
          <p><strong>Nouns:</strong> {responseData.nouns.join(', ')}</p>
          <p><strong>Verbs:</strong> {responseData.verbs.join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
