(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

self.addEventListener("install", async function () {
  console.log("Service worker installing...");
  // Add a call to skipWaiting here
});

self.addEventListener("activate", async function () {
  console.log("Service Worker actives");
});

self.addEventListener("notificationclick", function (e) {
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

  var data = e.data.json();

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
  e.waitUntil(self.registration.showNotification(data.data.title, e.data.json()));
});

},{}]},{},[1]);
