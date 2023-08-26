import mongoose from "mongoose";

// create Schema/Table/model

const colorSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'gray'},
    },
    {strict: true, timestamps: true}
    )

const Colors = mongoose.model('colors', colorSchema);

export default Colors;