importScripts(
    "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js",
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js",
  );
  
  firebase.initializeApp({
    apiKey: "AIzaSyByz3fPHLIaMn-6TV1NpMx9aN8befqrw2s",
    authDomain: "notturna-93b8f.firebaseapp.com",
    projectId: "notturna-93b8f",
    storageBucket: "notturna-93b8f.appspot.com",
    messagingSenderId: "842960782494",
    appId: "1:842960782494:web:64996246aae6549fe3278f",
  });
  const messaging = firebase.messaging();