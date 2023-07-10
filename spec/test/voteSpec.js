const Person = require('../../lib/jasmine_examples/Person');

describe('Person', function () {
  let person;

  beforeEach(function () {
    person = new Person();
  });

  it('should be eligible to vote', function () {
    person.name = 'John';
    person.age = 20;
    person.nationality = 'UK';
    // expect(person.age >= 18 && person.nationality).toBe(true);
    expect(person).toBeEligibleToVote();
  });

  it('should be underage', function () {
    person.name = 'Jane';
    person.age = 15;
    person.nationality = 'UK';
    // expect(person.age < 18 || !person.nationality).toBe(true);
    expect(person).not.toBeEligibleToVote();
  });

  it('should have no nationality', function () {
    person.name = 'Adam';
    person.age = 25;
    person.nationality = null;
    // expect(person.nationality).toBe(null);
    expect(person).not.toBeEligibleToVote();
  });
});
