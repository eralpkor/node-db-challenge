const express = require('express');

const Projects = require('./project-model');

const router = express.Router();



// MVP Endpoints

// GET /api/projects
router.get('/', (req, res) => {
  Projects.getProjects()
    .then(projects => {
      console.log(projects);
      const updatedProjects = projects.map(project => {
        !!project.completed ? project.completed = true : project.completed = false;
        // if (project.completed === 0) {
        //   project.completed = false;
        // } else if (project.completed === 1) {
        //   project.completed = true;
        // }
        return project;
      });
      res.status(200).json(updatedProjects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get projects' });
    });
});

// GET /apd/projects/:id 
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Projects.getProjectById(id)
    .then(project => {
      if (project) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({ message: `Could not find project with ID ${id}` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get project' });
    });
});

// POST /api/projects 
router.post('/', (req, res) => {
  const newProj = { ...req.body, completed: 0 };
  Projects.addProject(newProj)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to create new project' });
    });
});

// POST /api/projects/:id/addTask 
router.post('/:id/addTask', (req, res) => {
  const { id } = req.params;

  Projects.getProjectById(id)
    .then(project => {
      if (project) {
        const newTask = { ...req.body, completed: 0 };
        Projects.addTask(newTask, id).then(task => {
          res.status(201).json(task);
        });
      } else {
        res.status(404).json({ message: `NO project with given ID ${id}` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to create new task' });
    });
});



module.exports = router;