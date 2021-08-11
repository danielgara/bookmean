import express from 'express';
import MoviesController from './MoviesController.js';
import ReviewsController from './ReviewsController.js';

const router = express.Router(); // get access to express router

// router.route('/').get((req,res) => res.send('hello world'))
router.route('/').get(MoviesController.apiGetMovies);
router.route('/id/:id').get(MoviesController.apiGetMovieById);
router.route('/ratings').get(MoviesController.apiGetRatings);

router
  .route('/review')
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

export default router;
