import mongoose from 'mongoose';
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
})

const Contact = mongoose.model('contact', ContactSchema);

export { Contact };
