import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalendarPage from "./components/CalendarPage";

const App: React.FC = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("Service Worker registrado:", registration))
        .catch((error) => console.error("Error al registrar el Service Worker:", error));
    }
  }, []);
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "denied") {
          alert("Has bloqueado las notificaciones. Habilítalas en la configuración de tu navegador si deseas recibir recordatorios.");
        }
      });
    }
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
