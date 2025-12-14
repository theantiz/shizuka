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
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import axios from "axios";
import Link from "@mui/material/Link";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [emailTone, setEmailTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedReply, setGeneratedReply] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setErrorOpen(false);

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
      let message = "Something went wrong. Please try again.";

      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const backendMessage = error.response?.data?.message;

        if (status === 429) {
          message =
            "Google Gemini free tier token limit exceeded. Please try again later.";
        } else if (status === 401 || status === 403) {
          message = "Gemini API token expired or unauthorized.";
        } else if (backendMessage) {
          message = backendMessage;
        }
      }

      setErrorMessage(message);
      setErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleToneChange = (event) => {
    setEmailTone(event.target.value);
  };

  const handleCopy = async () => {
    if (!generatedReply) return;

    try {
      await navigator.clipboard.writeText(generatedReply);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Copy failed", err);
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

          <TextField
            fullWidth
            size="small"
            multiline
            minRows={4}
            maxRows={8}
            variant="outlined"
            label="Paste your email..."
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
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
              <MenuItem value="formal">Formal</MenuItem>
              <MenuItem value="concise">Concise</MenuItem>
              <MenuItem value="detailed">Detailed</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
          >
            {loading ? <CircularProgress size={20} /> : "Generate Reply"}
          </Button>
        </Paper>

        {/* GENERATED REPLY */}
        <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "primary.main" }}>
            Generated Reply
          </Typography>

          <TextField
            fullWidth
            size="small"
            multiline
            minRows={4}
            maxRows={8}
            variant="outlined"
            label="Reply will appear here..."
            value={generatedReply}
            inputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="outlined"
            startIcon={<ContentCopyIcon fontSize="small" />}
            onClick={handleCopy}
            disabled={!generatedReply}
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

      {/* SUCCESS TOAST */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>

      {/* ERROR TOAST */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
