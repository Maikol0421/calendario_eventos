import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./components/CalendarPage";
import { registerServiceWorker } from "./serviceWorker";

const App: React.FC = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
