const { Schema, model } = require("mongoose");

const mongoose = require("mongoose")

const slanderSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    isValidated: {
        type: Number,
        required: true,
        default: 0
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

    shields: {
        type: Number,
        default: 0,
        required: true,
        max: 5
    },
},
    {
        timestamps: true
    })
slanderSchema.methods.countUsersInGroup = function () {
    return mongoose.model('User').count({ groups: this.groupRef });
}



const Slander = model("Slander", slanderSchema);
module.exports = Slander;