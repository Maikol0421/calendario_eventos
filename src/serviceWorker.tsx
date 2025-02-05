export const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js"); 
        console.log("Service Worker registrado correctamente:", registration);
        return registration;
      } catch (error) {
        console.error("Error al registrar el Service Worker:", error);
      }
    } else {
      console.warn("Service Worker no soportado en este navegador.");
    }
  };
  