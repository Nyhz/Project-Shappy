const { Schema, model } = require("mongoose");
const Group = require("./Group.model")
const User = require("./User.model");
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
       slanderSchema.methods.countUsersInGroup = function() {
        return mongoose.model('User').count({groups: this.groupRef});
    }


    //    slanderSchema.methods.reveal = function() {
    //     //IF DEMOCRACY TRUE{
            
    //         //NO LIKE
    //         //NO DISLIKE
    //         //NO SHIELD
    //         //NO ATTACK 
    //         //REVEAL 
    //     //}
    //     mongoose.model('Group').findByIdAndUpdate(this.groupRef, {$pull: {images:this._id}})
    //     .then(()=>Image.findByIdAndDelete(this._id))
    //     .catch(err => console.log(err, "ERORORRORORORO"))
    // }

const Slander = model("Slander", slanderSchema);
module.exports = Slander;