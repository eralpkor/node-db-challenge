

const db = require('../../data/db-config.js');

module.exports = {
  getTasks,
};

function getTasks() {
  return db('tasks as t')
    .join('projects as p', 'p.id', 'project_id')
    .select(
      't.description as task description',
      'notes',
      't.completed',
      'p.name as project name',
      'p.description as project description',
    );
}