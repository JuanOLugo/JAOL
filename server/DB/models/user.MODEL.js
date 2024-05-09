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
    Store: String,
    StoreLevel: Number
})

set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
        delete ret.password
    }
})

const userModel = model("user", userSchema)

module.exports = userModel