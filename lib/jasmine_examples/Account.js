class Account {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  checkName(username) {
    if (username.length < 6) {
      return { valid: false, message: 'Name not valid' };
    }
    return { valid: true, message: 'oke name' };
  }

  checkPassword(password) {
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      return { valid: false, message: 'Password not valid' };
    }
    return { valid: true, message: 'oke password' };
  }

  checkEmail(email) {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return { valid: false, message: 'Email not valid' };
    }
    return { valid: true, message: 'oke email' };
  }

  checkAccountValidity() {
    const result = {
      name: this.checkName(this.username),
      password: this.checkPassword(this.password),
      email: this.checkEmail(this.email),
    };

    return result;
  }
}
module.exports = Account;
