
const express = require("express")
const { readFile } = require("fs")
const fs = require("fs/promises")
const { stringify } = require("querystring")
const { json } = require("stream/consumers")
const app = express()
const port = 3001

app.use(express.json)
const file = "todos.json"

async function readTodos() {
    const data = await fs.readFile(file, "utf-8")
    return JSON.parse(data);
}
async function writeTodos(todos) {
    await fs.writeFile(file, json.stringify(todos, 2, null))
}

// 3️ GET /todos (read all)
app.get("/todos", async (req, res) => {
    const toodos = await readTodos()
    res.json(todo)
})

app.get("/todos/:id", async (req, res) => {
    const todos = await fs.readTodo
    const id = req.params.id
    const todo = todos.find(todo => todo.id === id)
    if (!todo) return res.status(404).send();

    res.json(todo);
})
//POST /todos (create)
app.post("/todos", async (req, res) => {
    const todos = await readTodos();

    const newTodo = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description
    };

    todos.push(newTodo);
    await writeTodos(todos);

    res.status(201).json(newTodo);
});

// 

app.delete("/todos/:id", async (req, res) => {
  const todos = await readTodos();
  const id = parseInt(req.params.id);

  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).send();

  todos.splice(index, 1);

  await writeTodos(todos);

  res.send();
});


app.listen(port, () => {
    console.log(`This is listen on port ${port}`)
})

