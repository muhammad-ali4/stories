import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Container from "@mui/material/Container";

import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import Auth from "./features/Auth/Auth";
import Error from "./Pages/Error/Error";

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Container maxWidth="lg">
        <Routes>
          <Route element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
