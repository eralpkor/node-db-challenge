const express = require('express');
const helmet = require('helmet');

const ProjectRouter = require('./api/projects/project-router.js');
const ResourceRouter = require('./api/resources/resource-router.js');
const TaskRouter = require('./api/tasks/task-router.js');
const server = express();

server.use(helmet());
server.use(express.json());




server.get('/', (req, res) => {
  res.send('<h1>Sprint Challenge</h1>');
});

server.use('/api/projects', ProjectRouter);
server.use('/api/resources', ResourceRouter);
server.use('/api/tasks', TaskRouter);

module.exports = server;