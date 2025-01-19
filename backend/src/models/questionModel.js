const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const questionSchema = new mongoose.Schema({
    unique_id: { type: String, default: uuidv4, unique: true },
    title: { type: String, required: true },
    question_type: { type: String, required: true },
    description: { type: String },
    answer_type: { type: String, required: true, enum: ['text', 'number', 'textarea', 'date', 'time', 'radio'] },
    options: {
        type: [String],
        validate: {
            validator: function (v) {
                return this.answer_type === 'radio' ? v.length > 0 : true;
            },
            message: 'Options are required for radio type questions.',
        },
    },
    imageSrc: { type: String },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Question', questionSchema);
