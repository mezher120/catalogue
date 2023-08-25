import mongoose from "mongoose";

// create Schema/Table/model

const outstandingSchema = mongoose.Schema({
    src: {
        type: String,
        default: 'https://www.webempresa.com/foro/wp-content/uploads/wpforo/attachments/3200/318277=80538-Sin_imagen_disponible.jpg'
    } 
},
{strict: false, timestamps: true}
)

const OutStanding = mongoose.model('outstanding', outstandingSchema);

export default OutStanding;