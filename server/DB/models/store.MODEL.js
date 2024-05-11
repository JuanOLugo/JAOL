const { Schema, model, set } = require("mongoose")

const storeSchema = new Schema({
    StoreName: String,
    StorePassword: String,
    StoreOwner: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    StoreContableLog: [{
        type: Schema.Types.ObjectId,
        ref: "contable"
    }],
    StoreClients: [{
        type: Schema.Types.ObjectId,
        ref: "client"
    }],
    StorePaymentMethod: [{
        paymentName: String,
        paymentDescription: String
    }],

})

set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const storeModel = model("store", storeSchema)

module.exports = storeModel