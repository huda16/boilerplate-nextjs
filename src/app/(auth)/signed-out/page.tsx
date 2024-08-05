import { Box, Button, Container, Typography } from "@mui/material";

export default function SignedOutPage() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography component="h1" variant="h5">
          You have been signed out
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }} textAlign="center">
          You have successfully signed out. Click the button below to return to
          the homepage.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 3 }} href="/">
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
}
