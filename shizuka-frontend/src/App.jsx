import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
  Container,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useState } from "react";
import axios from "axios";
import Link from "@mui/material/Link";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [emailTone, setEmailTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedReply, setGeneratedReply] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://shizuka-mv0v.onrender.com/api/email/reply",
        { emailContent, tone: emailTone }
      );

      const reply =
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data);

      setGeneratedReply(reply);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleToneChange = (event) => {
    setEmailTone(event.target.value);
  };

  const handleCopy = async () => {
    if (generatedReply) {
      try {
        await navigator.clipboard.writeText(generatedReply);
        alert("Email content copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setEmailContent(text);
    } catch (err) {
      console.error("Failed to paste: ", err);
    }
  };

  const handleCopyFromTextArea = async (content) => {
    if (content) {
      try {
        await navigator.clipboard.writeText(content);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", py: 2 }}>
      <Container maxWidth="sm">
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 4 }}
        >
          シズカ
        </Typography>

        {/* ORIGINAL EMAIL */}
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "primary.main" }}>
            Original Email
          </Typography>

          <Box sx={{ position: "relative", mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              multiline
              minRows={4}
              maxRows={8}
              variant="outlined"
              label="Paste your email..."
              value={emailContent || ""}
              onChange={(e) => setEmailContent(e.target.value)}
            />
            <Box
              sx={{
                position: "absolute",
                top: 6,
                right: 8,
                display: "flex",
                gap: 1,
                zIndex: 1,
                color: "text.secondary",
              }}
            ></Box>
          </Box>

          <FormControl fullWidth size="small" sx={{ mb: 4 }}>
            <InputLabel>Select Tone</InputLabel>
            <Select
              value={emailTone}
              onChange={handleToneChange}
              label="Select Tone"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            size="medium"
          >
            {loading ? <CircularProgress size={20} /> : "Generate Reply"}
          </Button>
        </Paper>

        {/* GENERATED REPLY */}
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "primary.main" }}>
            Generated Reply
          </Typography>

          <Box sx={{ position: "relative", mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              multiline
              minRows={4}
              maxRows={8}
              variant="outlined"
              label="Reply will appear here..."
              value={generatedReply || ""}
              inputProps={{ readOnly: true }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 6,
                right: 8,
                zIndex: 1,
                color: "text.secondary",
              }}
            ></Box>
          </Box>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<ContentCopyIcon fontSize="small" />}
            onClick={handleCopy}
            disabled={!generatedReply}
            size="medium"
          >
            Copy to Clipboard
          </Button>
        </Paper>

        <Box sx={{ mt: 5, textAlign: "center", pb: 4 }}>
          <Typography variant="caption" color="text.secondary">
            © 2025 • Crafted with precision by{" "}
            <Link
              href="https://antiz.xyz"
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              Antiz
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
