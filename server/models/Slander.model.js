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

    // resistance: {
    //     type: Number,
    //     default: 1,
    //     required: true,
    // }
},
    {
        timestamps: true
    })
const Slander = model("Slander", slanderSchema);

module.exports = Slander;