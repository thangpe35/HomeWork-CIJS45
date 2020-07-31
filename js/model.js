const model = {};
model.currentUser = undefined;

model.register = async (email, password, firstName, lastName) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    firebase.auth().currentUser.updateProfile({
      displayName: firstName + ' ' + lastName
    })
    firebase.auth().currentUser.sendEmailVerification()
    alert('The email has been registered, please check your email!');
    view.setActiveScreen('loginScreen');
  } catch (err) {
    alert(err.message);
  }

  // Promise
  // .then((res) => {
  //   firebase.auth().currentUser.updateProfile({
  //     displayName: firstName + ' ' + lastName
  //   })
  //   firebase.auth().currentUser.sendEmailVerification()
  // })
  // .catch(err => {
  //   console.log(err)
  // })
}

model.login = async (email, password) => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    if (!response.user.emailVerified) {
      alert('Please verify your email');
    } else {
      model.currentUser = {
        displayName: response.user.displayName,
        email: response.user.email,
      }
      view.setActiveScreen('chatScreen');

    }
  } catch (err) {
    if (err.code == 'auth/user-not-found' || err.code == 'auth/invalid-email') {
      showError(email, 'Email is not registered');
    } else if (err.code == 'auth/wrong-password') {
      showError(password, 'Password is wrong');
    }
    // console.log(err);
  }
}

model.chat = async () => {
  try {
    const response = await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        view.setActiveScreen('chatScreen', user);
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}