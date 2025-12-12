// Create a `cli` that lets a user

//     1. Add a todo
//     2. Delete a todo
//     3. Mark a todo as done

//     Store all the data in files (todos.json)
// todo Cli assignment
// #!/usr/bin/env node
//imports Node.js’s built-in fs (filesystem) module.
// Purpose: allows the program to read and write files (todos.json) on disk.
const fs = require("fs")
const { Command } = require("commander")
let program = new Command()

//a constant string with the filename used to persist todos.
let TODO_File = "todos.json"
// helper to read todo
function readTodos() {
    const data = fs.readFileSync(TODO_File, "utf8")//reads the entire todos.json file as a UTF-8 string.
    return JSON.parse(data)//converts the JSON string into a JavaScript array/object.
}
// helper to write JSON file
function writeTodos(todos) {
    fs.writeFileSync(TODO_File, JSON.stringify(todos, null, 2))

}
program
    .name("todo-cli")
    .description("Filesystem based TODO CLI")
    .version("1.0.0");

// 1️⃣ ADD TODO COMMAND
program
    .command("add")
    .description("Add a new todo")
    .argument("<task>", "Task to add")
    .action((task) => {
        const todos = readTodos()
        const newtodo = {
            id: Date.now(),
            task,
            done: false
        }
        todos.push(newtodo)
        writeTodos(todos)
    })

//  DELETE TODO COMMAND
program
    .command("delete")
    .description("delete a todo by id")
    .argument("<id>", "Todo id")
    .action((id) => {
        const todos = readTodos()
        const filter = todos.filter(todo => todo.id !== Number(id));
        writeTodos(filter)
        console.log(`Deleted todo with ID: ${id}`);
    })
//MARK TODO AS DONE COMMAND
program
    .command("done")
    .description("Mark todo as done ")
    .argument("<id>", "Todo id")
    .action((id) => {
        const todos = readTodos()
        const todo = todos.find(t => t.id == id);
        if (!todo) {
            console.log(" todo not found ")
            return
        }
        todo.done = true;
        writeTodos(todos)
        console.log(`Marked as done: ${todo.task}`);
    })
// show all todo 
//1.show completed todo 2.show pending todos 3.all todos DO NOT USE writetodo()
program
    .command("list")
    .description("show all todo ")
    .action(() => {
        const todos = readTodos()
        console.table(todos);

    })
program.parse();
