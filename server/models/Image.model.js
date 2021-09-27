const { Schema, model } = require("mongoose");

const imageSchema = new Schema({

    imageUrl: {
        type: String,
        required: true
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

    tag: {
        type: String,
        required: true,
        lowercase: true,
        maxlength: 20,
        match: [/^[a-zA-Z]+$/, 'is invalid']
    },

    shields: {
        type: Number,
        default: 0,
        required: true
    },

    //     resistance: {
    //         type: Number,
    //         default: 1,
    //         required: true,
    //     }
},
    {
        timestamps: true
    })
const Image = model("Image", imageSchema);

module.exports = Image;