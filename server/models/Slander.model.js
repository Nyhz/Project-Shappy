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
<<<<<<< HEAD
       slanderSchema.methods.countUsersInGroup = function() {
        return mongoose.model('User').count({groups: this.groupRef});
    },

    slanderSchema.methods.slanderUserName = function() {
        return mongoose.model('User').findById(this.authorId).username;
    }
=======
slanderSchema.methods.countUsersInGroup = function () {
    return mongoose.model('User').count({ groups: this.groupRef });
}


>>>>>>> 75807f719f7dcc70a2ba65919694d9cab585e07c

const Slander = model("Slander", slanderSchema);
module.exports = Slander;