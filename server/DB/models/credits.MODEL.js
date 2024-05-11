const { Schema, model, set } = require("mongoose")

const creditSchema = new Schema({
    totalcredit: Number,
    descriptioncredit: String,
    //Store credit es la tienda a la cual va el credito
    Storecredit: {
        type: Schema.Types.ObjectId,
        ref: "store"
    },
    clientCredit: {
        type: Schema.Types.ObjectId,
        ref: "client"
    },
    products: [
        {
            nameProduct: String,
            quantity: Number,
            productCode: String
        }
    ]

})

set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.__v
    }
})

const creditModel = model("credit", creditSchema)

module.exports = creditModel