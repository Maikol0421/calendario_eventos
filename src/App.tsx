import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./components/CalendarPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
