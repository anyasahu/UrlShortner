import { Button, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submitUrl = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShortUrl("");

    try {
      const data = await axios.post("http://localhost:3000/api/short", {
        originalUrl: url
      });
      setShortUrl("http://localhost:3000/" + data.data.url.shortUrl);
    } catch (err) {
      console.error("Error creating short URL:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0d0d0d", // dark background
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: 4,
          borderRadius: 3,
          backgroundColor: "#1a1a1a",
          textAlign: "center",
          width: "500px",
          maxWidth: "90%",
          color: "#fff",
        }}
      >
        {/* Heading */}
        <Typography variant="h4" gutterBottom sx={{ color: "#FFD700", fontWeight: "bold" }}>
          Short URL
        </Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
          Paste the URL to be shortened
        </Typography>

        {/* Form */}
        <form
          onSubmit={submitUrl}
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the link here"
            variant="outlined"
            fullWidth
            sx={{
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FFD700" },
                "&:hover fieldset": { borderColor: "#FFD700" },
                "&.Mui-focused fieldset": { borderColor: "#FFD700" },
              },
              "& .MuiInputLabel-root": { color: "#FFD700" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#FFD700",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#e6c200" },
            }}
            disabled={loading}
          >
            {loading ? "..." : "Shorten"}
          </Button>
        </form>

        {/* Loader */}
        {loading && (
          <div style={{ marginTop: 20 }}>
            <CircularProgress style={{ color: "#FFD700" }} />
          </div>
        )}

        {/* Short URL result */}
        {shortUrl && !loading && (
          <Typography
            variant="h6"
            sx={{
              marginTop: 3,
              color: "#FFD700",
              wordBreak: "break-word",
            }}
          >
            Your short URL:{" "}
            <a href={shortUrl} style={{ color: "#FFD700", fontWeight: "bold" }}>
              {shortUrl}
            </a>
          </Typography>
        )}
      </Paper>
    </div>
  );
}

export default App;
