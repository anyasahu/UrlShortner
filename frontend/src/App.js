import { Button, TextField, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const submitUrl = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("https://anyaurl.onrender.com/api/short", {
        originalUrl: url
      });
      setShortUrl("https://anyaurl.onrender.com/" + data.data.url.shortUrl);
    } catch (err) {
      console.error("Error creating short URL:", err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F9F3EF",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 4,
          backgroundColor: "#D2C1B6",
          textAlign: "center",
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#1B3C53" }}>
          URL Shortener
        </Typography>

        <form
          onSubmit={submitUrl}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            onChange={(e) => setUrl(e.target.value)}
            label="Enter Original URL"
            placeholder="https://example.com"
            variant="outlined"
            fullWidth
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#1B3C53",
              "&:hover": { backgroundColor: "#456882" },
            }}
          >
            Submit
          </Button>
        </form>

        {shortUrl && (
          <Typography
            variant="h6"
            sx={{ marginTop: 2, color: "#1B3C53", wordBreak: "break-word" }}
          >
            Your short URL:{" "}
            <a
              href={shortUrl}
              style={{ color: "#456882", fontWeight: "bold" }}
            >
              {shortUrl}
            </a>
          </Typography>
        )}
      </Paper>
    </div>
  );
}

export default App;
