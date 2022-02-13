self.addEventListener("install",async () => {
  console.log("Service worker installing...");
  // Add a call to skipWaiting here
});

self.addEventListener("activate", async () => {
  console.log("Service Worker actives");
});

self.addEventListener("notificationclick", (e) => {
 // console.log(e.notification.data.url);

  switch (e.action) {
    case "open_url":
      // eslint-disable-next-line no-undef
      clients.openWindow(e.notification.data.url);
      break;

    default:
      // eslint-disable-next-line no-undef
      clients.openWindow(e.notification.data.url);

      break;
  }
});

self.addEventListener("push", async function (e) {
 
  const data=e.data.json()
 
  // var options = {
  //   body: body,
  //   icon: "/mstile-150x150.png",
  //   image: "",
  //   vibrate: [100, 50, 100],
  //   sound: "clip",
  //   data: {
  //     dateOfArrival: Date.now(),
  //     primaryKey: 1,
  //   },
  //   actions: [
  //     {
  //       action: "explore",
  //       title: "Explore this new world",

  //     },
  //     {
  //       action: "close",
  //       title: "I don't want any of this",

  //     },
  //   ],
  // };
  e.waitUntil(
    self.registration.showNotification(data.data.title, e.data.json())
  );
});
