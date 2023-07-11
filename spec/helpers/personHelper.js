beforeEach(function () {
  jasmine.addMatchers({
    toBeEligibleToVote: function () {
      return {
        compare: function (person) {
          const age = person.age;
          const nationality = person.nationality;

          let pass = true;
          let message = '';

          if (age < 18) {
            pass = false;
            message = 'Underage';
          } else if (!nationality) {
            pass = false;
            message = 'No nationality';
          }

          return {
            pass: pass,
            message: message,
          };
        },
      };
    },
  });
});

// "spec/voteSpec.js"
