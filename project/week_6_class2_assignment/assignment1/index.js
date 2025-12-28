
const express = require("express");
const app = express();
const port = 3002;

app.use(express.json());

const todos = [];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET todo by id
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo item not found with id " + id);
  }
});

// ADD todo
app.post("/add", (req, res) => {
  const { title, description } = req.body;

  const todo = {
    id: todos.length + 1,
    title,
    description,
    date: new Date(),
    done: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// ✏️ EDIT / UPDATE todo
app.put("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).send("Todo not found with id " + id);
  }

  const { title, description } = req.body;

  if (title) todo.title = title;
  if (description) todo.description = description;

  res.json(todo);
});

// ✅ MARK todo as done
app.put("/done/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).send("Todo not found with id " + id);
  }

  todo.done = true;
  res.json(todo);
});

// ❌ DELETE todo
app.delete("/remove/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.status(200).send("Deleted todo with id " + id);
  } else {
    res.status(404).send("Todo not found with id " + id);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
