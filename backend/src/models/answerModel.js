const mongoose = require('mongoose');

// const answerSchema = new mongoose.Schema({
//     question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
//     question_description: { type: String },
//     question_type: { type: String, required: true },  // Added question type
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     answer: { type: mongoose.Schema.Types.Mixed },
//     submitted_at: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Answer', answerSchema);


const answerSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: true
  },
  question_description: {
    type: String,
    required: true
  },
  question_type: {
    type: String,
    default: 'default'
  },
  user_id: {
    type: String,
    required: true
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
  
