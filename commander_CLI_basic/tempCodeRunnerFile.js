const fs1 = require('fs');//inetrnal module needed
const { Command } = require('commander'); // 1st we import command as you can guess it's class
const program1 = new Command();//  how do you know thisis class? because we write new command here  

program
  .name('counter')  //name of the program what you want to give command like
  .description('CLI to do file based tasks')
  .version('0.8.0');

program.command('count_line')// here we giving a very first command we can use multiple command here eg.count_words,count_letters
  .description('Count the number of words in a file')// you have give description here what above command wil do 
  .argument('<file>', 'file to count')
  .action((file) => {
    fs1.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const lines = data.split('\n').length;// if we add  this in("\n") it will give count of line but write now iam counting words.
        console.log(`There are ${lines} line in ${file}`);
      }
    });
  });

program1.parse();