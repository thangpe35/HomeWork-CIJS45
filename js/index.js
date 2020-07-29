const init = () => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBf7p6u9YNudKvN-zTbISnXPA0dRfMOc3o",
    authDomain: "chat-app-441f0.firebaseapp.com",
    databaseURL: "https://chat-app-441f0.firebaseio.com",
    projectId: "chat-app-441f0",
    storageBucket: "chat-app-441f0.appspot.com",
    messagingSenderId: "237489374051",
    appId: "1:237489374051:web:ae89452c058f00cadc0956"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log(firebase.app().name);
  model.chat();
  // view.setActiveScreen('loginScreen');
}

window.onload = init;
