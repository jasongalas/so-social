const router = require('express').Router();

const {
  getThoughts,
  getAThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

router.route('/thoughts')
  .get(getThoughts)
  .post(createThought);

router
  .route('/thoughts/:thoughtId')
  .get(getAThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions')
  .post()
  .delete();
module.exports = router;
