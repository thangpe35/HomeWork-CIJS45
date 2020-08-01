const view = {};

view.setActiveScreen = (screenName) => {

  switch (screenName) {
    // Welcome screen 
    case 'welcomeScreen':
      document.getElementById('app').innerHTML = components.welcomeScreen;
      break;

    // Register Screen
    case 'registerScreen':
      document.getElementById('app').innerHTML = components.registerScreen;
      const redirectToLogin = document.getElementById('redirect-to-login');

      // Redirect to login
      redirectToLogin.addEventListener('click', (e) => {
        view.setActiveScreen('loginScreen');
      })

      var registerForm = document.getElementById('register-form');

      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = registerForm.firstName;
        const lastName = registerForm.lastName;
        const email = registerForm.email;
        const password = registerForm.password;
        const confirmPassword = registerForm.confirmPassword;

        controller.register(firstName, lastName, email, password, confirmPassword);
      })
      break;

    // Login Screen
    case 'loginScreen':
      document.getElementById('app').innerHTML = components.loginScreen;
      const redirectToRegister = document.getElementById('redirect-to-register');

      var registerForm = document.getElementById('login-form');

      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = registerForm.email;
        const password = registerForm.password;
        const inputs = [email, password];

        controller.login(inputs);
      })

      // Redirect to register
      redirectToRegister.addEventListener('click', (e) => {
        view.setActiveScreen('registerScreen');
      })

      break;

    // Chat Screen
    case 'chatScreen':
      document.getElementById('app').innerHTML = components.chatScreen;
      const sendMessageForm = document.getElementById('send-message-form');
      // Get list messages from firestore
      const listMessages = getFromFirestore();
      listMessages.then((response) => {
        for (let i = 0; i < response.length; i++) {
          view.addMessage(response[i]);
        }
      })

      sendMessageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (sendMessageForm.message.value.trim() == '') {
          sendMessageForm.message.value = '';
        } else {
          const message = {
            content: sendMessageForm.message.value,
            owner: model.currentUser.email,
          }
          console.log(message.content);
          const createdAt = (new Date()).toISOString();
          const owner = model.currentUser.email;
          // const latestMess = addAndGet(message.content, createdAt, owner)

          addToFirestore(message.content, createdAt, owner).then(() => getOneLatestMess()).then(response => {
            view.addMessage(response);
          });

          // latestMess.then(response => {
          //   view.addMessage(response);
          // })
          // view.addMessage(message);
          // view.addMessage(botMsg);
        }
        sendMessageForm.message.value = '';
      })
      break;
  }
}

view.addMessage = (message) => {
  let messageWrapper = document.createElement('div');
  messageWrapper.classList.add('message-container');
  if (message.owner === model.currentUser.email) {
    messageWrapper.classList.add('mine')
    messageWrapper.innerHTML = `
        <div class='content'>
          ${message.content}
        </div>
      `
  } else {
    messageWrapper.classList.add('other');
    messageWrapper.innerHTML = `
      <div class="owner">
        ${message.owner}
      </div>
      <div class="content">
        ${message.content}
      </div>
    `
  }

  document.querySelector('.list-messages').appendChild(messageWrapper);

  // Styles scrollBar
  const out = document.getElementById('out');
  let isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop;
  if (!isScrolledToBottom) {
    out.scrollTop = out.scrollHeight - out.clientHeight;
  }
}

// Function add message to firestore
const addToFirestore = async (content, createdAt, owner) => {
  const documentIdToUpdate = 'fAnPTlov2jqtwTATeISY';
  const dataToUpdate = {
    messages: firebase.firestore.FieldValue
      .arrayUnion({
        content: content,
        createdAt: createdAt,
        owner: owner
      })
  }
  await firebase.firestore().collection('conversations').doc(documentIdToUpdate).update(dataToUpdate);
}

// Function get list messages from firestore
const getFromFirestore = async () => {
  const messages = await firebase.firestore().collection('conversations').get();
  const listMessages = messages.docs[0].data().messages;
  return listMessages;
}

// Function get one latest message
const getOneLatestMess = async () => {
  const messages = await firebase.firestore().collection('conversations').get();
  const listMess = messages.docs[0].data().messages;
  const latestMess = listMess[listMess.length - 1];
  return latestMess;
}

// const addAndGet = async (content, createdAt, owner) => {
//   await addToFirestore(content, createdAt, owner);
//   const latestMess = await getOneLatestMess();
//   return latestMess;
// }