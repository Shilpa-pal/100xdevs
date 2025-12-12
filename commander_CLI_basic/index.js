// command line interface

//step 1
// read how much word are their
// const  fs= require("fs")

// function main(filename){
//     fs.readFile(filename,"utf-8",function (err,data){

//         let total = 0
//         for(let i =0;i<data.length;i++){
//             if(data[i] === " "){// logic to count total words example if there is two words space will be one and add +1 you will get two 
//                 total++
//             }
//         }
//         console.log(total +1)
//     })

// }
// main("a.text")

//step2
//node "c:\Users\shilp\Desktop\harkirat node.js\index.js"
/// if we want to give some extra argument in terminal where (we give path to run the code)() like above index.js) node index.js /Users/shilpa pal/a.txt[after sapce we write anything it will show in terminal]
// to do this i have to to console.log(process.argv) below the function main(filesystem )
//11
//PS C:\Users\shilp\Desktop\harkirat node.js> 
//..........................................................code start from below .............................................
// const fs = require("fs")
// function main(filename) {
//     fs.readFile(filename, "utf-8", function (err, data) {
//         // console.log(process.argv) // this is line help to get everything we writing in terminal. we can write in this line in place of main("a.text") it will work as same 

//         let total = 0
//         for (let i = 0; i < data.length; i++) {
//             if (data[i] === " ") {// logic to count total words example if there is two words space will be one and add +1 you will get two 
//                 total++
//             }
//         }
//         console.log(total + 1)
//     })
// }
// // main("a.text")
// main(process.argv[2]) // we write [2] becuse node[process.argv[0] index.js[process.argv[1] Users\shilpapal\playing[2]

//note:..........................................................
// what it's moto of above code is that
// when we write node  index.js -h it gives nothing it will think node  index.js -h like a path it's give error
// fs. read file can not read (-h)
// but if we write node -h it provide information 


// as below you can see what ever you will write it will shows in third line
// //PS C:\Users\shilp\Desktop\harkirat node.js> node index.js Users\shilpapal\playing
// [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\shilp\\Desktop\\harkirat node.js\\index.js',
//   'Users\\shilpapal\\playing'
// ]
// 11
// PS C:\Users\shilp\Desktop\harkirat node.js> ^C
//step 3.......................................................code start from below ..
//why we are using it below above you can see if you want to count how much words in sentances yo ahve to use alogritham ,same if you want to know 
// how much letter in the sentance in file you have to write another function or alogritham so 
// if we have the library we we need to write each alogrithm code that 's why we writing below code
// above what we have written it is CLI but if we use commander it will create CLI quickely

const fs = require('fs');//inetrnal module needed
const { Command } = require('commander'); // 1st we import command as you can guess it's class
const program = new Command();//  how do you know thisis class? because we write new command here  

program
  .name('file realted CLI')  //name of the program what you want to give command like
  .description('CLI to do file based tasks')// you have give description here what above command wil do 
  .version('0.8.0');

  // 1st commadnode
program.command('count')// here we giving a very first command we can use multiple command here eg.count_words,count_letters
  .description('Count the number of words in a file')// here you have to give description of count command
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
         // const words = data.trim().split(/\s+/);we cn use this too becuse it will room extra space also
        const lines = data.split(' ').length;// if we add  this in("\n") it will give count of line but write now iam counting words.
        console.log(`There are ${lines} words in ${file}`);
      }
    });
  });

// we can use multiple command like 
// 2nd command
program.command('count_sentances')// here we giving a very first command we can use multiple command here eg.count_words,count_letters
  .description('Count the number of sentances in a file')// you have give description here what above command wil do 
  .argument('<file>', 'file to count')
  .action((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let words = 0
        for (let i = 0; i < data.length; i++) {
            if (data[i] === "\n") {// logic to count total words example if there is two words space will be one and add +1 you will get two 
                words++
            }
        }
        console.log(words)
        // we can write above condition also instead of split function 
        // const lines = data.split('\n').length;// if we add  this in("\n") it will give count of line but write now iam counting words.
       
        console.log(`There are ${lines} sentances in ${file}`);
      }
    });
  })

program.parse();
// run code by writing  node index.js count a.text (1st node next fileName you are in current. 2nd your command. last filename you want to run eg a.text,b.text)

// run code by writing  node index.js count_sentances a.text (1st node next fileName you are in current. 2nd your command. last filename you want to run eg a.text,b.text)

// see how created .............................................................................
// #!/usr/bin/env node
//this is a shebang

const term = require('terminal-kit').terminal;

const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();
const todosFile = path.join(__dirname, 'todos.json');

// Utility function to read todos from the file
function readTodos() {
    if (!fs.existsSync(todosFile)) {
        return [];
    }
    const data = fs.readFileSync(todosFile, 'utf8');
    if (!data) {
        return [];
    }
    return JSON.parse(data);
}

// Utility function to write todos to the file
function writeTodos(todos) {
    fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2));
}

// Description
program
    .name('CLI todo')
    .description('CLI based todo application')
    .version('1.0.0')

// Add todo
program.command('add <todo>')
    .description('add command will add tasks in todo')
    .action((todo) => {
        const todos = readTodos();
        todos.push({ task: todo, done: false });
        writeTodos(todos);
        term.bold.cyan(`Added: `).bold.yellow(`"${todo}" \n`);
    });

// Delete todo
program.command('delete <index>')
    .description('Delete a todo with index number')
    .action((index) => {
        const todos = readTodos();
        const del = todos.splice(index, 1);
        writeTodos(todos);
        term.bold.red(`Deleted: `).bold.yellow(`"${del[0].task}" \n`)
    });

// Mark as done
program.command('done <index>')
    .description('Mark a todo as done by its index')
    .action((index) => {
        const todos = readTodos();
        if (todos[index]) {
            todos[index].done = true;
            writeTodos(todos);
            term.bold.brightGreen(`Marked as done: `).bold.brightCyan(`"${todos[index].task}" \n`);
        }
        else {
            term.bold.red('Todo Not Found \n');
        }
    });

// Edit todo
program.command('edit <index> <newTodo>')
    .description('Edit todo by index and replacing the old task with new task')
    .action((index, newTodo) => {
        const todos = readTodos();
        if (todos[index]) {
            const oldTodo = todos[index].task;
            todos[index].task = newTodo;
            writeTodos(todos);
            term.bold.cyan(`Todo Edited: `).bold.red(`"${oldTodo}"`).bold.cyan(` to `).bold.green(`"${newTodo}" \n`);
        }
        else {
            term.bold.red(`Todo not found \n`);
        }
    });

// List all todo
program.command('list')
    .description('List all todo tasks')
    .action(() => {
        const todos = readTodos();
        if (todos.lenght === 0) {
            term.bold.red('No todos found \n');
        }
        else {
            todos.forEach((todo, index) => {
                let status;
                if (todo.done) {
                    status = 'X'; // Mark as done
                } else {
                    status = ' '; // Not done
                }
                term.bold.magenta(`${index}. ${todo.task} [${status}]\n`);
            });
        }
    });

program.parse();