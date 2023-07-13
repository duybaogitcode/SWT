const axios = require('axios');
const userServices = require('../../lib/jasmine_examples/userServices');

describe('processUserData', () => {
  it('should return "Checked" when user data is completed', async () => {
    const userId = 1;
    // hàm này gọi và trả về giá trị thực tế này
    const realGet = await userServices.processUserData(userId);
    console.log('realGet: ' + realGet);
    // thực hiện spyOn và trả về giá trị được định trước
    const mockGet = spyOn(axios, 'get').and.returnValue(
      Promise.resolve({ data: { completed: true } })
    );
    const result = await userServices.processUserData(userId);
    console.log('mockGet: ' + result);
    expect(result).toEqual('Checked');
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${userId}`);
  });
  it('should return "!Checked" when user data is not completed using createSpy', async () => {
    const userId = 4;
    const mockAxiosGetSpy = jasmine
      .createSpy('axios.get')
      .and.returnValue(Promise.resolve({ data: { completed: false } }));
    const result = await userServices.processUserData(userId);
    expect(result).toEqual('Checked');
    expect(mockAxiosGetSpy).toHaveBeenCalledWith(
      `https://jsonplaceholder.typicode.com/todos/${userId}`
    );
  });
  it('should return "Checked" when user data is completed using callFake', async () => {
    const userId = 1;
    const mockUserData = { completed: true };
    const mockGet = spyOn(axios, 'get').and.callFake((url) => {
      if (url === `https://jsonplaceholder.typicode.com/todos/${userId}`) {
        return Promise.resolve({ data: mockUserData });
      } else {
        return Promise.resolve({ data: { completed: false } });
      }
    });
    const result = await userServices.processUserData(userId);
    expect(result).toEqual('Checked');
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockGet).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${userId}`);
  });
  it('should return true when user data is completed using stub', async () => {
    const user1 = 'duybao';
    const user2 = 'nguyenduybao';
    const stub = spyOn(axios, 'get').and.stub();
    stub
      .withArgs(`https://jsonplaceholder.typicode.com/todos/${user1}`)
      .and.returnValue({ data: { completed: true } });
    stub
      .withArgs(`https://jsonplaceholder.typicode.com/todos/${user2}`)
      .and.returnValue({ data: { completed: false } });
    const result1 = await userServices.processUserData(user1);
    const result2 = await userServices.processUserData(user2);
    expect(result1).toEqual('Checked');
    expect(result2).toEqual('!Checked');
    expect(stub).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${user1}`);
    expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${user2}`);
  });
  it('should return "!Checked" when user data is not completed', async () => {
    const userId = 1;
    const mockGet = spyOn(axios, 'get').and.returnValue(
      Promise.resolve({ data: { completed: false } })
    );
    const result = await userServices.processUserData(userId);
    expect(result).toEqual('!Checked');
    expect(mockGet).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${userId}`);
  });
  it('should throw an error when failed to fetch user data', async () => {
    const userId = 1;
    const mockGet = spyOn(axios, 'get').and.throwError('Failed to fetch user data');
    try {
      await userServices.processUserData(userId);
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).toEqual('Failed to fetch user data');
    }
    expect(mockGet).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${userId}`);
  });
});
