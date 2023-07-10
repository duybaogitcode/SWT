const Calculator = require('../../lib/jasmine_examples/calculator');

// BDD test suite
describe('Calculator', function () {
  let calculator;

  beforeEach(function () {
    calculator = new Calculator();
  });

  // BDD test cases
  it('should add two numbers correctly', function () {
    const result = calculator.add(2, 3);
    expect(result).toEqual(5);
  });

  it('should subtract two numbers correctly', function () {
    const result = calculator.subtract(5, 2);
    expect(result).toEqual(3);
  });

  it('should multiply two numbers correctly', function () {
    const result = calculator.multiply(4, 2);
    expect(result).toEqual(8);
  });

  it('should divide two numbers correctly', function () {
    const result = calculator.divide(10, 2);
    expect(result).toEqual(5);
  });

  it('should throw an error when dividing by zero', function () {
    expect(function () {
      calculator.divide(10, 0);
    }).toThrowError('Cannot divide by zero');
  });

  it('should throw an error when dividing by zero', function () {
    expect(function () {
      calculator.divide(10, 0);
    }).toThrowError('Cannot divide by zero');
  });
});
