var fs = require('fs');
var request = require('request');

module.exports = {
  pwd: function() {
    process.stdout.write(process.cwd());
    process.stdout.write('\nprompt > ');

  },
  ls: function(file, done, stdin){
    fs.readdir('.', function(err, files) {
      if (err) throw err;
      var output = '';
      files.forEach(function(file) {
        output += file.toString() + "\n";
      })
      // process.stdout.write("prompt > ");
      done(output);
    });
  },

  echo: function(command, done, stdin){
    var output = command +'\n';
    done(output);
  },

  cat: function(files, done, stdin){
    fs.readFile(process.cwd() + '/' + files, (err, data) => {
      if (err) throw err;
      done(data, stdin);
    });
  },

  head: function(files, done, stdin){
    fs.readFile(process.cwd() + '/' + files, (err, data) => {
      if (err) throw err;
      var output = '';
      data = data.toString().split('\n');
      for (var i = 0 ; i < 5 ; i++){
        output += data[i] + '\n';
      }
     done(output, stdin);
    });
  },

  tail: function(files, done, stdin){
    fs.readFile(process.cwd() + '/' + files, (err, data) => {
      if (err) throw err;
      var output = '';
      data = data.toString().split('\n');
      for (var i = data.length - 1 ; i > data.length - 6 ; i--){
        output += data[i] + '\n';
      }
      done(output);
    });
  },

  wc: function(files, done, stdin){
    fs.readFile(process.cwd() + '/' + files, (err, data) => {
      if (err) throw err;
      data = data.toString().split('\n');
      done(data.length, stdin);
    });
  },

  sort: function(files, done, stdin){
    fs.readFile(process.cwd() + '/' + files, (err, data) => {
      if (err) throw err;
      var output = '';
      data = data.toString().split('\n').sort();
      for (var i = 0 ; i < data.length ; i++){
        output += data[i] + '\n';
      }
      done(output);
    });
  },

  curl: function(url, done, stdin) {
    request({
      method: 'GET',
      uri: url,
    }, function (error, response, body) {
      done(body); // Print the HTML for the Google homepage.
    });
  },

  grep: function(file, done, stdin, searchString) {
    console.log(stdin);
    fs.readFile(process.cwd() + '/' + file, (err, data) => {
      if (err) throw err;
      var output = '';
      data = data.toString().split('\n');
      for (var i = 0 ; i < data.length ; i++){
        if (data[i].indexOf(searchString) !== -1) output += data[i] + '\n';
      }
      done(output, stdin);
    });

  }

}
