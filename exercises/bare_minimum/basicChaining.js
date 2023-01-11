/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructor = require('./promiseConstructor.js');
var promisification = require('./promisification.js');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // reads a GitHub username from a `readFilePath` - on first line of the file
  return promiseConstructor.pluckFirstLineFromFileAsync(readFilePath)
    .then(function(username) {
      if (!username) {
        throw new Error('no username');
      } else {
        return username;
      }
    })
    .then(function(currentUser) {
      // sends a request to the GitHub API for the user's profile

      return promisification.getGitHubProfileAsync(currentUser);
    })
    .then(function(profile) {
      // then, writes the JSON response of the API to `writeFilePath`
      return fs.writeFileSync(writeFilePath, JSON.stringify(profile));
    })
    .catch(function(err) {
      console.log('Oops, caught an error: ', err.message);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
