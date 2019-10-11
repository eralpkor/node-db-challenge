

const express = require('express');
const Tasks = require('./task-model.js');
const router = express.Router();


// GET /api/tasks
router.get('/', (req, res) => {
  Tasks.getTasks()
    .then(tasks => {
      const updatedTasks = tasks.map(task => {
        !!task.completed ? task.completed = true : task.completed = false;
        // if (!!task.completed) { //task.completed === 0
        //   task.completed = false;
        // } else if (task.completed === 1) {
        //   task.completed = true;
        // }
        return task;
      });
      res.status(200).json(updatedTasks);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Cannot  get tasks' });
    });
});


module.exports = router;