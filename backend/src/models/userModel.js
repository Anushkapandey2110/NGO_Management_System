const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    user_id: { type: String, default: uuidv4, unique: true },
    username: { type: String },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    role: {
        type: String,
        enum: ['User', 'Employee', 'Admin', 'SuperAdmin'], // Allowed roles
        default: 'User'
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], // Events registered by the user
    profile_picture: { type: String, default: 'https://www.gravatar.com/avatar/' },
    bio: { type: String },
    social_links: { type: Map, of: String },
});

// Pre-save middleware to hash password before saving
// userSchema.pre('save', async function(next) {
//     if (this.isModified('Password')) {
//         this.Password = await bcrypt.hash(this.Password, 10);
//     }
//     next();
// });

// Method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.Password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
