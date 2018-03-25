// FUNCTIONAL PROGRAMMING USING ES5

// Step 1: Hello World
function upperCaser(input) {
  return input.toUpperCase();
}

module.exports = upperCaser;

// Step 2: Higher Order Functions
// function repeat(operation, num) {
//   if (num === 0) {
//     return;
//   } else {
//     return repeat(operation, num - 1);
//   }
// }

// module.exports = repeat;

// Step 3: Map
function doubleAll(numbers) {
  return numbers.map(function(ele) {
    return ele * 2;
  });
}

module.exports = doubleAll;

// Step 4: Filter
function getShortMessages(messages) {
  return messages.map(function(message) {
    return message.message;
  }).filter(function(innerMessage) {
    return innerMessage.length < 50;
  });
}

module.exports = getShortMessages;

/*
Step 5: Every Some

Return a function that takes a list of valid users, and returns a
function that returns true if all of the supplied users exist in the original 
list of users.
*/
function checkUsersValid(goodUsers) {
  return function allUsersValid(submittedUsers) {
    return submittedUsers.every(function(user) {
      return goodUsers.some(function(validUser) {
        return validUser.id === user.id;
      });
    });
  };
}

module.exports = checkUsersValid;

/*
Step 6: Reduce

Given an Array of strings, use Array# reduce to create an object that contains
the number of times each string occured in the array.Return the object directly
(no need to console.log).
*/

function countWords(inputWords) {
  return inputWords.reduce(function(dict, word) {
    dict[word] = ++dict[word] || 1;

    return dict;
  }, {});
}

module.exports = countWords;

/*
Step 7: Recursion
Implement Array# reduce using recursion.

To test your reduction works correctly we will use your reduce implementation
to execute our solution to the previous basic_reduce problem.i.e.your reduce
function will be passed an array of words, and a function, and an initial value
which will return an object containing the counts for each word found in the 
array. You don't need to implement this functionality, it will be supplied to 
your reduce implementation.

For simplicity, your implementation of reduce need not replicate the behaviour 
of a reduce missing an initial value.You may assume the initial value will 
always be supplied.
*/

function reduce(arr, fn, initial) {
  if (!arr.length) {
    return initial;
  }

  initial = fn(initial, arr[0]);

  return reduce(arr.slice(1), fn, initial);
}

module.exports = reduce;

/*
Step 8: Call

Write a function duckCount that returns the number of arguments passed to it 
which have a property 'quack' defined directly on them.Do not match values 
inherited from prototypes.
*/


function duckCount() {
  return Array.prototype.slice.call(arguments)
    .reduce(function(sum, maybeDuck) {
      if (Object.prototype.hasOwnProperty.call(maybeDuck, 'quack')) {
        return sum + 1;
      } else {
        return sum;
      }
    }, 0);
}

module.exports = duckCount;

/*
Step 9: Partial Apply

Use partial application to create a function that fixes the first argument to
console.log.i.e. Implement a logging function that prepends a namespace string 
to its output.

Your implementation should take a namespace String and return a function that 
prints messages to the console with the namespace prepended.

You should use Function# apply to implement the partial application.

Make sure all arguments passed to the returned logging
function are printed.
*/

var slice = Array.prototype.slice;

function logger(namespace) {
  return function() {
    var messages = slice.apply(arguments).join(' ');
    console.log(namespace + ' ' + messages);
  };
}

/* Official solution
function logger(namespace) {
  return function () {
    console.log.apply(console, [namespace].concat(slice.call(arguments)))
  }
}
*/

module.exports = logger;

/*
Step 10: Partial Bind

Use Function# bind to implement a logging function that allows you to namespace 
messages.

Your implementation should take a namespace string, and return a
function that prints messages to the console with the namespace prepended.

Make sure all arguments passed to the returned logging
function are printed.

Print the output to the console directly
*/

module.exports = function (namespace) {
  return console.log.bind(console, namespace);
};

/*
Step 11: Map with Reduce

Use Array# reduce to implement a simple version of Array# map.
*/

module.exports = function arrayMap(arr, fn) {
  return arr.reduce(function(map, ele, idx, _arr) {
    map.push(fn(ele));
    return map;
  }, []);
};

/*
Step 12: Function Spies
Override a specified method of an object with new functionality
while still maintaining all of the old behaviour.

Create a spy that keeps track of how many times a
function is called.
*/

function Spy(target, method) {
  var self = {
    count: 0
  };
  var fn = target[method];

  target[method] = function override() {
    self.count++;
    return fn.apply(this, arguments);
  };

  return self;
}

module.exports = Spy;

/*
Step 13: Blocking Event Loop

Modify the recursive repeat function provided in the boiler plate, such that it
does not block the event loop(i.e.Timers and IO handlers can fire). This 
necessarily requires repeat to be asynchronous.

A timeout is queued to fire after 100 milliseconds, which will print the results
of the test and exit the process.repeat should release control of the event loop
to allow the timeout to interrupt before all of the operations complete.

Try to perform as many operations as you can before the timeout fires!
*/

function repeat(operation, num) {
  // modify this so it can be interrupted
  if (num <= 0) {
    return operation();
  }
  
  return repeat(operation, --num);
}

module.exports = repeat;