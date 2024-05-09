const {Schema, model, set} = require("mongoose")

const billSchema = new Schema({
    titleBill: String,
    totalBill: Number,
    descriptionBill: String,
    StoreBill: {
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

const billModel = model("bill", billSchema)

module.exports = billModel