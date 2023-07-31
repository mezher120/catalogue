import mongoose from "mongoose";  // to connect to DB

async function dbConnect(params) {
    try {
     await mongoose.connect(`${process.env.URL}/incanto`, { useNewUrlParser: true})   // connect to DB, add the db's name at the end
     console.log('DB is connected') 
    } catch (error) {
        console.log(error.message, '-db error');
    }
}

export default dbConnect;