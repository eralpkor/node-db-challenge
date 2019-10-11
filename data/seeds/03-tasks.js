
exports.seed = function(knex) {
  return knex('tasks').insert([
    {
      description: 'Task 1 for Project 1',
      notes: 'Some notes here',
      completed: 0,
      project_id: 1,
    },
    {
      description: 'Task 2 for Project 1',
      notes: 'More notes here...',
      completed: 0,
      project_id: 1,
    },
    {
      description: 'Task 1 for Project 2',
      notes: 'Lorem ipsum',
      completed: 0,
      project_id: 2,
    },
    {
      description: 'Task 2 for Project 2',
      notes: 'More lorem ipsum',
      completed: 0,
      project_id: 2,
    },
  ]);
};