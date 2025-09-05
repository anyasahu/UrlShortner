import { Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submitUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl(""); 

    try {
      const data = await axios.post("https://anyaurl.onrender.com/api/short", {
        originalUrl: url,
      });

      setShortUrl("https://anyaurl.onrender.com/" + data.data.url.shortUrl);
    } catch (err) {
      console.error("Error creating short URL:", err);
    } finally {
      setLoading(false);
    }
  };

   return (
    <div className="app-container">
      <h1 className="title">Short URL</h1>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          placeholder="Enter the link here"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-box"
        />
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Loading..." : "Shorten URL"}
        </button>
      </form>

      {/* Display the shortened URL */}
      {shortUrl && (
        <div className="result">
          <p>Your shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="short-link"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
