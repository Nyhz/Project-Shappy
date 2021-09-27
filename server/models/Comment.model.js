const { Schema, model } = require("mongoose");

const commentSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    slanderRef: {
        type: Schema.Types.ObjectId,
        ref: 'Slander'
    },

    imageRef: {
        type: Schema.Types.ObjectId,
        ref: 'Image'
    },

    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    likes: {
        type: Number,
        required: true,
        default: 0
    },

    dislikes: {
        type: Number,
        required: true,
        default: 0
    },
},
    {
        timestamps: true
    })

const Comment = model("Comment", commentSchema);

module.exports = Comment;