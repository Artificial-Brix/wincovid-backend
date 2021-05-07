import mongoose from 'mongoose';
const { Schema } = mongoose;

const GetHelpPostSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    abPositive: {
        type: Boolean,
        default: false,
    },
    abNegative: {
        type: Boolean,
        default: false,
    },
    aPositive: {
        type: Boolean,
        default: false,
    },
    aNegative: {
        type: Boolean,
        default: false,
    },
    bPositive: {
        type: Boolean,
        default: false,
    },
    bNegative: {
        type: Boolean,
        default: false,
    },
    oPositive: {
        type: Boolean,
        default: false,
    },
    oNegative: {
        type: Boolean,
        default: false,
    },
    oxygenCylinder: {
        type: Boolean,
        default: false,
    },
    oxygenRefiling: {
        type: Boolean,
        default: false,
    },
    covidAmbulance: {
        type: Boolean,
        default: false,
    },
    nonCovidAmbulance: {
        type: Boolean,
        default: false,
    },
    covidMedicine: {
        type: Boolean,
        default: false,
    },
    nonCovidMedicine: {
        type: Boolean,
        default: false,
    },
    covidBeds: {
        type: Boolean,
        default: false,
    },
    nonCovidBeds: {
        type: Boolean,
        default: false,
    },
    covidICUBeds: {
        type: Boolean,
        default: false,
    },
    nonCovidICUBeds: {
        type: Boolean,
        default: false,
    },
    food: {
        type: Boolean,
        default: false,
    },
    others: {
        type: Boolean,
        default: false,
    },
    additionalDetails: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    }
})

const GetHelpPost = mongoose.model('need-help', GetHelpPostSchema);

export { GetHelpPost };