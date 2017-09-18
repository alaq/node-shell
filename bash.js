// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function (data) {
  var cmd = data.toString().trim(); // remove the newline

  if (cmd === 'pwd'){
    process.stdout.write(process.cwd());
  } else if (cmd === 'date') {
    process.stdout.write(new Date().toString());

  }

  // process.stdout.write('You typed: ' + cmd);
  process.stdout.write('\nprompt > ');

});
