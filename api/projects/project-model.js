

const db = require('../../data/db-config.js');

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  addTask,
};

function getProjects() {
  return db('projects');
}

function getProjectById(id) {
  return db('projects')
    .where({ id })
    .first();
}

function addProject(project) {
  return db('projects')
    .insert(project)
    .then(ids => getProjectById(ids[0]));
}

function addTask(task, project_id) {
  return db('tasks')
    .insert({ ...task, project_id })
    .then(id => db('tasks').where({ id: id[0] }));
}