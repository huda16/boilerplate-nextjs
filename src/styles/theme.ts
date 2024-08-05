import { createTheme } from "@mui/material";

import { LinkBehaviour } from "@/components/ui/link-behaviour";

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2", // Primary blue color
//       light: "#4791db", // Light blue for hover states
//       dark: "#115293", // Dark blue for active states
//       contrastText: "#fff", // Text color on primary
//     },
//     secondary: {
//       main: "#dc004e", // Secondary pink color
//       light: "#e33371", // Light pink for hover states
//       dark: "#9a0036", // Dark pink for active states
//       contrastText: "#fff", // Text color on secondary
//     },
//     background: {
//       default: "#f5f5f5", // Default background color
//       paper: "#ffffff", // Paper background color
//     },
//     text: {
//       primary: "#333", // Primary text color
//       secondary: "#666", // Secondary text color
//     },
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     h1: {
//       fontSize: "2.25rem",
//       fontWeight: 400,
//     },
//     h2: {
//       fontSize: "1.875rem",
//       fontWeight: 400,
//     },
//     h3: {
//       fontSize: "1.5rem",
//       fontWeight: 400,
//     },
//     h4: {
//       fontSize: "1.25rem",
//       fontWeight: 400,
//     },
//     h5: {
//       fontSize: "1rem",
//       fontWeight: 400,
//     },
//     h6: {
//       fontSize: "0.875rem",
//       fontWeight: 500,
//     },
//     body1: {
//       fontSize: "1rem",
//       fontWeight: 400,
//     },
//     body2: {
//       fontSize: "0.875rem",
//       fontWeight: 400,
//     },
//   },
//   spacing: 8, // Default spacing (8px)
//   shape: {
//     borderRadius: 8, // Default border radius
//   },
//   components: {
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           padding: "16px",
//           borderRadius: "8px",
//           boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "8px",
//           textTransform: "none", // Prevent uppercase text
//         },
//         contained: {
//           boxShadow: "none", // Remove default shadow for contained buttons
//           "&:hover": {
//             boxShadow: "0 4px 6px rgba(0,0,0,0.2)", // Custom hover shadow
//           },
//         },
//       },
//     },
//     MuiAppBar: {
//       styleOverrides: {
//         root: {
//           borderBottom: "1px solid #e0e0e0",
//         },
//       },
//     },
//     MuiTypography: {
//       styleOverrides: {
//         h1: {
//           fontSize: "2.25rem",
//           fontWeight: 400,
//         },
//         h2: {
//           fontSize: "1.875rem",
//           fontWeight: 400,
//         },
//         h3: {
//           fontSize: "1.5rem",
//           fontWeight: 400,
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           borderRadius: "8px",
//           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         },
//       },
//     },
//     MuiIconButton: {
//       styleOverrides: {
//         root: {
//           borderRadius: "50%",
//         },
//       },
//     },
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           borderRadius: "4px",
//           backgroundColor: "#fff",
//         },
//       },
//     },
//     MuiDrawer: {
//       styleOverrides: {
//         paper: {
//           borderRight: "1px solid #e0e0e0",
//         },
//       },
//     },
//     MuiLink: {
//       defaultProps: {
//         component: LinkBehaviour,
//       },
//       styleOverrides: {
//         root: {
//           color: "#1976d2",
//           textDecoration: "none",
//           "&:hover": {
//             textDecoration: "underline",
//           },
//         },
//       },
//     },
//     MuiButtonBase: {
//       defaultProps: {
//         LinkComponent: LinkBehaviour,
//       },
//     },
//   },
// });

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    mode: "light",
  },
});
