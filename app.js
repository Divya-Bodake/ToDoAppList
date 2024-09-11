console.log("Starting the server...");
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 4000;

app.use(express.json());

let tasks = [];
const tasksFile = './tasks.json';

// Load tasks from JSON file
if (fs.existsSync(tasksFile)) {
    tasks = JSON.parse(fs.readFileSync(tasksFile));
}

// GET all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    tasks.push(newTask);
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    res.json(newTask);
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id != req.params.id);
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
    res.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}\n`);
});

