const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const questionController= require('../controllers/questionController')

router.get('/getQuestions', authMiddleware,  questionController.getQuestionsByType);
// router.post('/postAnswer', authMiddleware, questionController);
router.post('/submitSurvey', authMiddleware, questionController.submitQuestion)
module.exports = router;