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
    members: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    slanders: [{
        type: Schema.Types.ObjectId,
        ref: "Slander"
    }],
    images: [{
        type: Schema.Types.ObjectId,
        ref: "Images"
    }],
})

const Group = model("Group", groupSchema);

module.exports = Group;