self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/calendario.ico",
    data: { url: "https://calendario-eventos-oropeza.netlify.app" }, // 🔹 Agregar la URL aquí
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Cierra la notificación al hacer clic

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        if ("focus" in client) {
          return client.focus(); // Si ya está abierta, enfoca la pestaña
        }
      }
      // 🔹 Usar la URL de los datos de la notificación
      if (clients.openWindow && event.notification.data?.url) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
