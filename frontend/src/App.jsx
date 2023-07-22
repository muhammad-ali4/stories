import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Container from "@mui/material/Container";

import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import StoryDetails from "./components/Stories/StoryDetails/StoryDetails";
import Auth from "./features/Auth/Auth";
import Error from "./Pages/Error/Error";

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const teller = JSON.parse(localStorage.getItem("profile"));
  const [author, setAuthor] = useState(teller?.name);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Container maxWidth="xl">
        <Routes>
          <Route element={<Navbar setAuthor={setAuthor} />}>
            <Route path="/" element={<Navigate to="/stories" />} />
            <Route path="/stories" element={<Home author={author} />} />
            <Route path="/stories/:id" element={<StoryDetails />} />
            <Route
              path="/auth"
              element={
                !teller ? (
                  <Auth setAuthor={setAuthor} />
                ) : (
                  <Navigate to="/stories" />
                )
              }
            />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default App;
