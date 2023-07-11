const axios = require('axios');
const userServices = require('../../lib/jasmine_examples/userServices');

describe('processUserData', () => {
  it('should return "Checked" when user data is completed', async () => {
    const userId = 1;

    const realGet = await userServices.processUserData(userId);
    console.log('realGet: ' + realGet);

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
    // expect(mockAxiosGetSpy).toHaveBeenCalledWith(
    //   `https://jsonplaceholder.typicode.com/todos/${userId}`
    // );
  });

  // it('should return "!Checked" when user data is not completed', async () => {
  //   const userId = 1;
  //   const mockGet = spyOn(axios, 'get').and.returnValue(
  //     Promise.resolve({ data: { completed: false } })
  //   );

  //   const result = await userServices.processUserData(userId);

  //   expect(result).toEqual('!Checked');
  //   expect(mockGet).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${userId}`);
  // });

  // it('should throw an error when failed to fetch user data', async () => {
  //   const userId = 1;
  //   const mockGet = spyOn(axios, 'get').and.throwError('Failed to fetch user data');

  //   try {
  //     await userServices.processUserData(userId);
  //     fail('Expected an error to be thrown');
  //   } catch (error) {
  //     expect(error.message).toEqual('Failed to fetch user data');
  //   }

  //   expect(mockGet).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/todos/${userId}`);
  // });
});
