const { Schema, model } = require("mongoose");

const slanderSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    isValidated: {
        type: Boolean,
    },

    authorId: {
        type: String,
        required: true,
    },

    groupRef: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],

    shields: {
        type: Number,
        default: 0,
        required: true
    },
},
    {
        timestamps: true
    })
const Slander = model("Slander", slanderSchema);

module.exports = Slander;