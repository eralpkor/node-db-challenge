

const router = require('express').Router();
const Resources = require('./resources-model.js');


// GET /api/resources 
router.get('/', (req, res) => {
  Resources.getResources()
    .then(resources => res.status(200).json(resources))
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get resource...' });
    });
});

// POST /api/resources 
router.post('/', (req, res) => {
  Resources.addResource(req.body)
    .then(resource => {
      res.status(201).json(resource);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to create new one...' });
    });
});


module.exports = router;