const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    userName: { 
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      validation: true,
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thoughts',
      },
    ],
    
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('Friend Count').get(function(){
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
