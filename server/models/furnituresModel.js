import mongoose from "mongoose"; // import mongoose

// create Schema/Table/model

const furnitureSchema = mongoose.Schema({
    codigo: String,
    nombre: String,
    categoria: String,
    destacado: String,
    nuevo: String,
    precio: {
        type: Number,
        default: 0
    },
    descuento: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    imagen: {
        type: String,
        default: 'INCANTO PHOTO URL'
    },
    descripcion: {
        type: String,
        default: '...'
    },
    url: {
        type: String,
        default: 'https://www.incanto.com.ar/'
    },
    unidades: {
        type: Number,
        default: 1
    },
    habilitado: {
        type: Boolean,
        default: true
    } 
},
{strict: false, timestamps: true}
);

const furniture = mongoose.model('furnitures', furnitureSchema) // specify the name where es going to be the new Schema

export default furniture;