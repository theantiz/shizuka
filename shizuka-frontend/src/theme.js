
import { createTheme } from '@mui/material/styles';

export const pinkJapaniTheme = createTheme({
  palette: {
    primary: {
      main: '#E91E63', // Deep pink
      light: '#F8BBD9',
      dark: '#AD1457',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFB6C1', // Light pink
      light: '#FFE4E6',
      dark: '#FF69B4',
      contrastText: '#000000',
    },
    background: {
      default: '#FFF8F9', // Very light pink background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#666666',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: '#2196F3',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#E91E63',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      color: '#E91E63',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12, // Rounded corners for Japanese aesthetic
  },
  components: {

    MuiContainer: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #FFF8F9 0%, #FFE4E6 100%)',
          minHeight: '100vh',
          paddingTop: '2rem',
          position: 'relative',
          '&::before': {
            content: '"🌸"',
            position: 'absolute',
            top: '20px',
            right: '20px',
            fontSize: '2rem',
            opacity: 0.3,
          },
          '&::after': {
            content: '"🌺"',
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            fontSize: '2rem',
            opacity: 0.3,
          },
        },
      },
    },
    MuiBox: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 8px 32px rgba(233, 30, 99, 0.1)',
          border: '1px solid rgba(233, 30, 99, 0.1)',
          marginBottom: '1.5rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E91E63',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E91E63',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#666666',
            '&.Mui-focused': {
              color: '#E91E63',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          boxShadow: '0 4px 12px rgba(233, 30, 99, 0.2)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(233, 30, 99, 0.3)',
          },
        },
        outlined: {
          borderColor: '#E91E63',
          color: '#E91E63',
          background: 'linear-gradient(45deg, rgba(233, 30, 99, 0.1) 30%, rgba(255, 182, 193, 0.1) 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, rgba(233, 30, 99, 0.2) 30%, rgba(255, 182, 193, 0.2) 90%)',
            borderColor: '#AD1457',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #E91E63 30%, #FFB6C1 90%)',
          color: '#FFFFFF',
          '&:hover': {
            background: 'linear-gradient(45deg, #AD1457 30%, #E91E63 90%)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(233, 30, 99, 0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E91E63',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E91E63',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#E91E63',
        },
      },
    },
  },
});
