import mongoose from "mongoose";

// create Schema/Table/model

const coverSchema = mongoose.Schema({
    title: {
        type: String,
        default: 'What do you sell?'
    },
    enterprise: {
        type: String,
        default: 'Name Company'
    },
    subtitle: {
        type: String,
        default: 'subtitle'
    },
    instagram: Boolean,
    instagramUrl: String,
    facebook: Boolean,
    facebookUrl: String,
    whatsApp: Boolean,
    whatsAppUrl: Number,
    footer: {
        type: String,
        default: 'footer'
    }
},
{strict: true, timestamps: true}
)

const Covers = mongoose.model('covers', coverSchema);

export default Covers;
