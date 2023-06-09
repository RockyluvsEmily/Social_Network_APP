const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughttext: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

thoughtSchema.virtual('reactioncount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
