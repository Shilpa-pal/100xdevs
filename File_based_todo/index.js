// import express module
const express = require("express")

// import fs module
const fs = require("fs");
const { json } = require("stream/consumers");

// create express app instance
const app = express();

app.use(express.json());

// define the port
const PORT = 3001
// helper functions to find index of an object in an array and remove an object at a specific index
function findIndex(arr, id) {
    // find the index of the object with the given id in the array
    for (let i = 0; i < arr.length; i++) {

        // if the id matches, return the index
        if (arr[i].id === id) {
            return i
        }
    }
    // if the id is not found, return -1
    return -1
}
function removeIndex(arr, index) {
    let newarray = []
    for (let i = 0; i < arr.length; i++) {
        if (i !== index) {
            newarray.push(arr[i])
        }

    }// return the new array with the object removed
    return newarray
}
// define the routes to get all todos
app.get("/todos", (req, res) => {

    // reads the todo from the file
    fs.readFile("todos.json", "utf8", function (err, data) {
        // if there is an error, throw it
        if (err) {
            throw err
        }
        // send the todos as a response
        res.json(JSON.parse(data));
    });
});
// define the routes to get a specific todo by id
app.get("/todos/:id", (req, res) => {

    // read the todos from the file
    fs.readFile("todos.json", "utf8", function (err, data) {
        // if there is an error, throw it
        if (err) {
            throw err;
        }
        /*
        const todos = JSON.parse(data);   // Step 1: convert JSON string to array
        
        Cannot return whole file,stored in variable becuz You need to search/filter, so you must store parsed data
        For “get all” → no filtering → send whole data → no variable needed
        ✔ For “get one” → must find specific item → variable needed
        const todoIndex = findIndex(todos, id);   // Step 2: find item
        res.json(todos[todoIndex]);   // Step 3: send only one item */
        // parse the todos from the file
        const todos = JSON.parse(data)
        //find the index of the todo with the given id

        let todoIndex = findIndex(todos, parseInt(req.params.id))
        // if the todo is not found, return 404
        if (todoIndex === -1) {
            res.status(404).send();
        } else {

            /*This becomes the JavaScript array:todos = [
           { id: 10, title: "Buy milk" },
           { id: 20, title: "Study" },
           { id: 30, title: "Exercise" }
        ]
        Now someone makes this request: GET /todos/20
        So ID = 20
        Step 1: Find the index of id=20
        const todoIndex = findIndex(todos, 20);
        Here todos[1] is:{ id: 20, title: "Study" }
        So:todoIndex = 1
        
        Step 2: Return only that specific todo
        res.json(todos[todoIndex]);
        This becomes:res.json(todos[1]);
        Which becomes:res.json({ id: 20, title: "Study" });
        So the response sent to the user is:
        {
          "id": 20,
          "title": "Study"
        }Not the entire array.Not all todos.Only one specific todo.*/
            // if the todo is found, return the todo
            res.json(todos[todoIndex]);
        }

    })
})
// define the routes to create a new todo
app.post("/todos", function (req, res) {
    // create a new todo object with the given title and description
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),// unique random id
        title: req.body.title,
        description: req.body.description,
    };
    // read all the todos from todos file
    fs.readFile("todos.json", "utf8", (err, data) => {
        // if there is an error, throw it
        if (err) {
            throw err;
        }
        // parse the todos from file
        const todos = JSON.parse(data);
        // add the new todo to the todos array
        todos.push(newTodo);

        // // write the updated todos back to the file
        fs.writeFile("todos.json", json.stringify(todos), (err) => {
            // if there is an error, throw it
            if (err) {
                throw err;
            }
            // send the new todo as a response
            res.status(201).json(newTodo);
        })
    })
})

// define the routes to update a todo by id
app.put("/todos/:id", (req, res) => {
    // read the todos from the file
    fs.readFile("todos.json", "utf8", (err, data){
        if (err) {
            throw err
        }
        // parse the todos from the file
        const todos = JSON.parse(data);

        // find the index of the todo with the given id
        const todoIndex = findIndex(todos, parseInt(req.params.id));

        // if the todo is not found, return 404
        if (todoIndex === -1) {
            res.status(404).send()

        } else {
            // update the title and description of the todo
            const updatedTodo = {
                id: todos[todoIndex].id,
                title: req.body.title,
                description: req.body.description,
            }
            //update the todo in the todos array
            todos[todoIndex] = updatedTodo;
            // write the updated todos back to the file
            fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
                // if there is an error, throw it
                if (err) {
                    throw err;
                }

                // send the updated todo as a response
                res.status(200).json(updatedTodo);
            });
        }
    })
})
// define the routes to delete a todo by id
app.delete("/todos/:id", function (req, res) {
    // read ht todos from the file
    fs.readFile("todos.json", "utf8", (err, data) => {
        if (err) {
            throw err
        }
        // parse the todos from the file
        const todos = JSON.parse(data)

        // find the index of the todo with an id
        const todoIndex = findIndex(todos, parseInt(req.params.id))
        // if the todo is not found, return 404
        if (todoIndex === -1) {
            res.status(404).send();
        } else {
            // remove the todo from the todos array
            todos = removeIndex(todos, todoIndex);
            // write the updated todos back to the file
            fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
                // if there is an error, throw it
                if (err) {
                    throw err;
                }
                // send a success response
                res.status(200).send();

            });
        }
    })
// If the route is not defined, return 404
app.use((req, res, next) => {
    res.status(404).send();
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})