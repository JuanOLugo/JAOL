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


storeSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.id = obj._id
    delete obj._id
    delete obj.__v
    delete obj.StorePassword
    return obj;
};

const storeModel = model("store", storeSchema)

module.exports = storeModel