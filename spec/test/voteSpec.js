const Account = require('../../lib/jasmine_examples/Account');

describe('Account', () => {
  let account;

  beforeEach(() => {
    account = new Account('duy bao', 'Password123', 'duybao@gmail.com');
  });

  it('should return valid status for name, password, and email', () => {
    const result = account.checkAccountValidity();

    expect(result.name.valid).toBe(true);
    expect(result.name.message).toBe('oke name');
    expect(result.password.valid).toBe(true);
    expect(result.password.message).toBe('oke password');
    expect(result.email.valid).toBe(true);
    expect(result.email.message).toBe('oke email');
  });

  it('should return invalid status for name, password, and email', () => {
    account.username = 'bao';
    account.password = 'password';
    account.email = 'bao123email';

    const result = account.checkAccountValidity();

    expect(result.name.valid).toBe(false);
    expect(result.name.message).toBe('Name not valid');
    expect(result.password.valid).toBe(false);
    expect(result.password.message).toBe('Password not valid');
    expect(result.email.valid).toBe(false);
    expect(result.email.message).toBe('Email not valid');
  });
});
