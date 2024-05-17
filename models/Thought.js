const { Schema, model } = require('mongoose');
const reactionSchema = require('./Assignment');

// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      max_length: 280,
    },
    
    createdAt: {
      type: Date,
      default: Date.now,
    },

    username: {
    type: String,
      required: true,
    },

    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;
