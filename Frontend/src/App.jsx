import React, { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import SummarizerPage from "./pages/SummarizerPage";
import Login from "./pages/Login";
import { useSelector } from 'react-redux';

function App() {
  const [route, setRoute] = useState(window.location.hash || "#/");
  const theme = useSelector((s)=>s.theme.mode);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (route === "#/summarizer") {
    return <SummarizerPage />;
  }
  if (route === "#/login") {
    return <Login />;
  }
  return <Landing />;
}

export default App;
