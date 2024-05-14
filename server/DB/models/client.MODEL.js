const {Schema, model, set} = require("mongoose")

const clientSchema = new Schema({
    clientName: String,
    clientCredits: [{
        type: Schema.Types.ObjectId,
        ref: "credits"
    }],
    clientStore: {
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

const clientModel = model("client", clientSchema)

module.exports = clientModel