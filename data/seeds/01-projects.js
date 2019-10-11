
exports.seed = function(knex) {
  return knex('projects').insert([
    {
      name: 'Project 1',
      description: 'Some description here 1.',
      completed: 0,
    },
    {
      name: 'Project 2',
      description: 'Another description here... 2',
      completed: 0,
    },
  ]);
};
