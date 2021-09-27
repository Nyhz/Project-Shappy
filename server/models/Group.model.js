const { Schema, model } = require("mongoose");

const groupSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    password: {
        type: String
    },

    groupAvatar: {
        type: String,
        required: true,
        //default: to-do
    },

    endDate: {
        type: Date,
    },

    isEnded: {
        type: Boolean
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    // members: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // }],
},
    {
        timestamps: true
    })
const Group = model("Group", groupSchema);

module.exports = Group;