const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./models/Todo");
require('newrelic');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
});

app.listen(5000, () => console.log("Server running on port 5000"));
