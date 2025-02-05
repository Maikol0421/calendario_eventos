import axios from "axios";
import { registerServiceWorker } from "../serviceWorker";

export const subscribeToNotifications = async () => {
  try {
    const registration = await registerServiceWorker();
    if (!registration) return;

    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY; // Clave pública de VAPID
    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey, // Aquí se pasa correctamente la clave pública
    });

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/calendario/subscribe`, subscription);

    console.log("Suscripción enviada al backend correctamente.");
  } catch (error) {
    console.error("Error al suscribirse a notificaciones:", error);
  }
};

// Función para convertir clave VAPID de Base64 a Uint8Array
const urlBase64ToUint8Array = (base64String : string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

