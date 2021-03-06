var commands = require('./commands');
var fs = require('fs');
var userCommand = 'pwd';

// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var fullCmd = data.toString().trim(); // remove the newline
  var cmdList = fullCmd.split(/\s*\|\s*/g);
  var cmd = cmdList[0].split(" ")[0];
  var args = cmdList[0].split(" ").slice(1).join(" ");
  commands[cmd](args, done, cmdList.slice(1).join("|"));

});

function done(output, stdin){
  if (stdin.split(/\s*\|\s*/g)[0]){
    fs.writeFile('temp.txt', output);
    console.log('function', stdin.split(/\s*\|\s*/g)[0]);
    commands[stdin.split(/\s*\|\s*/g)[0].split(' ')[0]]('temp.txt', done, stdin.split(/\s*\|\s*/g).slice(1).join('|'), stdin.split(/\s*\|\s*/g)[0].split(' ')[1]);
  } else {
    process.stdout.write(output + '\n');
    process.stdout.write("prompt > ");
  }
}
