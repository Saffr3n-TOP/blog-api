// @ts-check

const express = require('express');
const postsController = require('../controllers/posts');
const commentsController = require('../controllers/comments');

const router = express.Router();

router.get('/', postsController.postsGet);
router.post('/', postsController.postsPost);
router.get('/:postId', postsController.postGet);
router.put('/:postId', postsController.postPut);
router.delete('/:postId', postsController.postDelete);

router.get('/:postId/comments', commentsController.commentsGet);
router.post('/:postId/comments', commentsController.commentsPost);
router.put('/:postId/comments/:commentId', commentsController.commentPut);
router.delete('/:postId/comments/:commentId', commentsController.commentDelete);

module.exports = router;
