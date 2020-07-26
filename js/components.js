const components = {
  chatScreen(data) {
    return `
  <h1>Welcome ${data.displayName}</h1>
  `;
  }
};

components.welcomeScreen = `
  <h1>Hello</h1>
`;

components.registerScreen = `
<div class="login-container">
  <div class="aside-right">
    <div class="header">
      <h2>My chat</h3>
    </div>
    <form id='register-form'>
      <div class="input-name-wrapper">
        <div class="input-wrapper">
          <input type="text" name="firstName" placeholder="First Name" />
          <div class="error" id='first-name-error'></div>
        </div>
        <div class="input-wrapper">
          <input type="text" name="lastName" placeholder="Last Name" />
          <div class="error" id='last-name-error'></div>
        </div>
      </div>
      <div class="input-wrapper">
        <input type='text' placeholder="Email" name='email' />
        <div class="error" id='email-error'></div>
      </div>
      <div class="input-wrapper">
        <input type='password' placeholder="Password" name='password' />
        <div class="error" id='password-error'></div>
      </div>
      <div class="input-wrapper">
        <input type='password' placeholder="Confirm password" name='confirmPassword' />
        <div class="error" id='confirm-password-error'></div>
      </div>
      <div class="form-action">
        <span id='redirect-to-login'>
          Already have an account? Login
        </span>
        <button type="submit" class="btn">
          Register
        </button>
      </div>
    </form>
  </div>
</div>

`;

components.loginScreen = `
<div class="login-container">
  <div class="aside-right">
    <div class="header">
      <h2>My chat</h3>
    </div>
    <form id='login-form'>
      <div class="input-wrapper">
        <input type='text' placeholder="Email" name='email' />
        <div class="error" id='email-error'></div>
      </div>
      <div class="input-wrapper">
        <input type='password' placeholder="Password" name='password' />
        <div class="error" id='password-error'></div>
      </div>
      <div class="form-action">
        <span id='redirect-to-register'>
          Don't have an account? Register
        </span>
        <button type="submit" class="btn">
          Login
        </button>
      </div>
    </form>
  </div>
</div>

`;
