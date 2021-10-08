const { Schema, model } = require("mongoose");
const User = require("./User.model");
const Group = require("./Group.model")
const mongoose = require("mongoose")

const imageSchema = new Schema({

    imageUrl: {
        type: String,
        required: true
    },

    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],

    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    groupRef: {
        type: Schema.Types.ObjectId,
        ref: "Group"
    },

    tag: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 1,
        maxlength: 20,
    },

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


imageSchema.methods.countUsersInGroup = function () {
    return mongoose.model('User').count({ groups: this.groupRef });
}

imageSchema.methods.destroy = function () {
    return mongoose.model('Group').findByIdAndUpdate(this.groupRef, { $pull: { images: this._id } })
        .then(() => Image.findByIdAndDelete(this._id))
        .catch(err => console.log(err, "ERORORRORORORO"))
}




const Image = model("Image", imageSchema);
module.exports = Image;

//DESTROY:
 //     Group.findByIdAndUpdate(image.groupRef, {$pull: {images:image._id}})
                        //     .then(group => {
                        //     Image.findByIdAndDelete(image._id)
                        //     .then(res => console.log(res))
                        //     .catch(err => console.log(err, "ERORORRORORORO"))
                        //     })