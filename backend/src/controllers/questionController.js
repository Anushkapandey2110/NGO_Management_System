// controllers/questionController.js
const mongoose = require('mongoose'); 
const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
// Fetch questions by question_type
exports.getQuestionsByType = async (req, res) => {
    try {
        // Extract question_type from query parameters
        const { question_type } = req.query;
        // console.log(req.query);   Log the query params to verify

        // Validate input
        if (!question_type) {
            console.log("Sent question type required");
            return res.status(400).json({ message: 'Question type is required.' });
        }

        // Fetch questions with the specified question_type
        const questions = await Question.find({ question_type });
        
        // Check if any questions were found
        if (questions.length === 0) {
            console.log("Length 0")
            return res.status(404).json({ message: `No questions found for type: ${question_type}` });
        }

        // Send successful response
        return res.status(200).json({ success: true, data: questions });
    } catch (error) {
        console.error('Error fetching questions:', error);
        return res.status(500).json({ message: 'Server error while fetching questions.' });
    }
};



// exports.submitQuestion = async (req, res) => {
//     try {
//         const { answers } = req.body;
//         const { user_id }=req.user;
//         console.log( answers, user_id);
//         // Validate input
//         if (!answers || !Array.isArray(answers) || answers.length === 0 || !user_id) {
//           return res.status(400).json({ message: 'Answers array and user ID are required.' });
//         }
    
//         // Map the answers array to match the Answer schema
//         const answerDocuments = answers.map(answer => ({
//           question_id: answer.unique_id,               // Assuming unique_id maps to question_id
//           question_description: answer.description,
//           question_type: answer.question_type,
//           user_id: user_id,
//           answer: answer.answer,
//         }));
    
//         // Insert all answers at once
//         await Answer.insertMany(answerDocuments);
    
//         return res.status(201).json({ message: 'Answers saved successfully.' });
//       } catch (error) {
//         console.error('Error saving answers:', error);
//         return res.status(500).json({ message: 'Server error', error: error.message });
//       }
// };


// exports.submitQuestion = async (req, res) => {
//   try {
//     const { answers } = req.body;
//     const { user_id } = req.user; // Ensure this comes from a valid authenticated user
//     console.log(user_id);
//     // console.log("Body : ", req.body)
//     // Validate input
//     if (!answers || !Array.isArray(answers) || answers.length === 0) {
//       console.log("Returning from answer array required ")
//       return res.status(400).json({ message: 'Answers array is required.' });
//     }

//     if (!mongoose.Types.ObjectId.isValid(user_id)) {
//       console.log("returning from invalid user if")
//       return res.status(400).json({ message: 'Invalid user ID.' });
//     }

//     // Map answers and ensure question_id is a valid ObjectId
//     const answerDocuments = answers.map(answer => {
//       if (!mongoose.Types.ObjectId.isValid(answer.unique_id)) {
//         console.log("returnign from Invalid question id")
//         throw new Error(`Invalid question ID: ${answer.unique_id}`);
//       }
//       return {
//         question_id: mongoose.Types.ObjectId(answer.unique_id),
//         question_description: answer.description || '',
//         question_type: answer.question_type || 'default', // Provide default value if necessary
//         user_id: mongoose.Types.ObjectId(user_id),
//         answer: answer.answer,
//       };
//     });

//     // Insert answers into the database
//     await Answer.insertMany(answerDocuments);
//     console.log("Answers saved successfully.")
//     return res.status(201).json({ message: 'Answers saved successfully.' });
//   } catch (error) {
//     console.log("Returning Error saving answer ")
//     console.error('Error saving answers:', error);
//     return res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };

exports.submitQuestion = async (req, res) => {
  try {
    const { answers } = req.body;
    const { user_id } = req.user;

    // Validate input
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      console.log("Returning from answer array required ");
      return res.status(400).json({ message: 'Answers array is required.' });
    }

    // Validate user_id is a non-empty string
    if (!user_id || typeof user_id !== 'string' || user_id.trim().length === 0) {
      console.log("Returning from invalid user_id");
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    // Map answers and handle unique_id as a string
    const answerDocuments = answers.map(({ unique_id, description, question_type, answer }) => {
      if (typeof unique_id !== 'string' || unique_id.trim().length === 0) {
        console.log("Returning from Invalid unique_id");
        throw new Error(`Invalid question ID: ${unique_id}`);
      }
      return {
        question_id: unique_id,
        question_description: description || '',
        question_type: question_type || 'default',
        user_id: user_id,
        answer: answer,
      };
    });

    // Insert answers into the database
    const result = await Answer.insertMany(answerDocuments);
    console.log("Answers saved successfully:", result);
    return res.status(201).json({ message: 'Answers saved successfully.' });
  } catch (error) {
    console.log("Returning Error saving answer ");
    console.error('Error saving answers:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
