
const router = require('express').Router();
const Projects = require('./project-model');


// GET /api/projects
router.get('/', (req, res) => {
  Projects.getProjects()
    .then(projects => {
      console.log(projects);
      const updatedProjects = projects.map(project => {
        project.completed = project.completed ? true : false;
     
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
// router.get('/:id', (req, res) => {
//   const { id } = req.params;

//   Projects.getProjectById(id)
//     .then(project => {
//       if (project) {
//         res.status(200).json(project);
//       } else {
//         res
//           .status(404)
//           .json({ message: `Could not find project with ID ${id}` });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ message: 'Failed to get project' });
//     });
// });

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
router.post('/:id/addtask', (req, res) => {
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

// STRETCH - GET /api/projects/:id 
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Projects.getProjectById(id)
    .then(project => {
      if (project) {
        const updatedProject = {
          ...project,
          completed: project.completed === 1 ? true : false,
          tasks: [],
          resources: [],
        };
        res.status(200).json(updatedProject);
      } else {
        res.status(404).json({ message: `Cannot find project ID ${id}` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get project ...' });
    });
});

// STRETCH - GET /api/projects/:id/resources...
router.get('/:id/resources', (req, res) => {
  const { id } = req.params;
  Projects.getProjectResources(id)
    .then(resources => {
      if (resources.length) {
        res.status(200).json(resources);
      } else {
        res.status(404).json({ message: `Cannot find resources for given project ID ${id}` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get resources...' });
    });
});

// STRETCH - GET /api/projects/:id/tasks 
router.get('/:id/tasks', (req, res) => {
  const { id } = req.params;
  Projects.getProjectTasks(id)
    .then(tasks => {
      if (tasks.length) {
        const updatedTasks = tasks.map(task => {
          task.completed = task.completed ? true : false;
          // if (task.completed === 0) {
          //   task.completed = false;
          // } else if (task.completed === 1) {
          //   task.completed = true;
          // }
          return task;
        });
        res.status(200).json(updatedTasks);
      } else {
        res.status(404).json({ message: `Cannot find tasks for given project ${id}` });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get tasks...' });
    });
});

module.exports = router;