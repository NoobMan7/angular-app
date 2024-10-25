importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging.js');

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyBSReoT7gam0Fv8hSLxU5HC5gPR0IVibPk",
    authDomain: "gymuserservice.firebaseapp.com",
    projectId: "gymuserservice",
    storageBucket: "gymuserservice.appspot.com",
    messagingSenderId: "582333373426",
    appId: "1:582333373426:web:ef598d1c31d463183b296b",
    measurementId: "G-5DJT5PS4S4"
};


firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/path/to/your/icon.png'  // Customize this path to your icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging.js');
// firebase.initializeApp({
//     apiKey: "AIzaSyBSReoT7gam0Fv8hSLxU5HC5gPR0IVibPk",
//     authDomain: "gymuserservice.firebaseapp.com",
//     projectId: "gymuserservice",
//     storageBucket: "gymuserservice.appspot.com",
//     messagingSenderId: "582333373426",
//     appId: "1:582333373426:web:ef598d1c31d463183b296b",
//     measurementId: "G-5DJT5PS4S4"
// });




// angular.json

// "src/firebase-messaging-sw.js",