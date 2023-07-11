import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Container from "@mui/material/Container";

import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import Auth from "./features/Auth/Auth";

function App() {
  return (
    <GoogleOAuthProvider clientId="38149980260-k112igu14gn6fbp5hils2935i2h4f826.apps.googleusercontent.com">
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
