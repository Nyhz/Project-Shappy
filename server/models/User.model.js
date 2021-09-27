const { Schema, model } = require("mongoose");

const userSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[a-zA-Z0-9]+$/, 'is invalid']
  },

  password: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },

  role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user',
  },

  avatar: {
    type: String,
    required: true
  },

  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],

  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image',
  }],

  slanders: [{
    type: Schema.Types.ObjectId,
    ref: "Slander",
  }],

  achievements: [{
    type: String,
    //enum:[] todo
  }],

  shields: {
    type: Number,
    max: 5,
  },

  attacks: {
    type: Number,
    max: 2,
  },

  coins: {
    type: Number,
    required: true,
    default: 10,
  },
},
  {
    timestamps: true
  })
const User = model("User", userSchema);

module.exports = User;