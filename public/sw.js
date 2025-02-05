self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/calendario.ico",
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close(); // Cierra la notificación al hacer clic

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((windowClients) => {
        // Verifica si ya hay una ventana abierta con la app
        for (let client of windowClients) {
          if (client.url.includes("/eventos") && "focus" in client) {
            return client.focus(); // Si ya está abierta, enfoca la pestaña
          }
        }
        // Si no está abierta, abre una nueva ventana
        if (clients.openWindow) {
          return clients.openWindow("https://calendario-eventos-oropeza.netlify.app/");
        }
      })
  );
});
