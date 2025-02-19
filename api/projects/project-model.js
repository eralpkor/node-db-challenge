

const db = require('../../data/db-config.js');


module.exports = {
  getProjects,
  getProjectById,
  getProjectTasks,
  getProjectResources,
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

function getProjectTasks(id) {
  return db('tasks')
    .select('id', 'description', 'notes', 'completed')
    .where({ project_id: id });
}

function getProjectResources(project_id) {
  return db('resources as r')
    .join('project-resources as pr', 'pr.resource_id', 'r.id')
    .select('r.id', 'r.name', 'r.description')
    .where({ project_id });
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