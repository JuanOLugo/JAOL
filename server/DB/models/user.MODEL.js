const {Schema, model, set} = require("mongoose")

const userSchema = new Schema({
    userName: String, 
    password: String,
    BillsLog: [
        {
            type: Schema.Types.ObjectId,
            ref: "contable"
        }
    ],
    typeAccount: String,
    Stores: [{
        type: Schema.Types.ObjectId,
        ref: "store"
    }],
    StoreLevel: Number
})

userSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.id = obj._id
    delete obj._id
    delete obj.__v
    delete obj.password;
    return obj;
  };



const userModel = model("user", userSchema)

module.exports = userModel