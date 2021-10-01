const { Schema, model } = require("mongoose");

const groupSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    secret: {
        type: String,
        required: true,
        unique: true
    },

    groupAvatar: {
        type: String,
        required: true,
        default: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    },

    endDate: {
        type: Date,
    },

    isEnded: {
        type: Boolean,
        default: false,
        required: true
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    images: [{
        type: Schema.Types.ObjectId,
        ref: "Image"
    }],
},
    {
        timestamps: true
    })
const Group = model("Group", groupSchema);

module.exports = Group;