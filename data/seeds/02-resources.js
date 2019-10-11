
exports.seed = function(knex) {
  return knex('resources').insert([
    { name: 'Build a db', description: 'Building a database from scratch.' },
    { name: 'Feeding cats', description: 'Needs a talent to feed a cat.' },
    { name: 'Walking Sunny', description: 'Hope not to go by mailbox.' },
    { name: 'Walking Norman', description: 'Dont even try'},
  ]);
};