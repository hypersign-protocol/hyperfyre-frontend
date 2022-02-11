






self.addEventListener("install", () => {
  
  console.log("Service worker installing...");
  // Add a call to skipWaiting here
});


self.addEventListener("activate",()=>{
  console.log("Service Worker actives");
})

self.addEventListener('notificationclick',(e)=>{
  clients.openWindow(e.action)
  
})

self.addEventListener("push", function (e) {

  
  

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
  e.waitUntil(self.registration.showNotification("Push Notification", e.data.json()));
});
