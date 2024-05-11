const {Schema, model, set} = require("mongoose")

const ContableSchema = new Schema({
    date: String,
    bills: [{
        type: Schema.Types.ObjectId,
        ref: "bills"
    }],
    credits: [{
        type: Schema.Types.ObjectId,
        ref: "credits"
    }],
    //store contable es a la tienda a la que pertenece este contabilidad
    storeContable: {
        type: Schema.Types.ObjectId,
        ref: "store"
    }


})

set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const contableModel = model("contable", contableSchema)

module.exports = userModel