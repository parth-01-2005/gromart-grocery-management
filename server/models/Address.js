import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {type: String, requird: true},
    firstName: {type: String, requird: true},
    lastName: {type: String, requird: true},
    email: {type: String, requird: true},
    street: {type: String, requird: true},
    city: {type: String, requird: true},
    state: {type: String, requird: true},
    zipcode: {type: Number, requird: true},
    country: {type: String, requird: true},
    phone: {type: String, requird: true},
})

const Address = mongoose.models.address || mongoose.model('address', addressSchema)

export default Address