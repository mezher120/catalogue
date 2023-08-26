import Covers from "../models/coversModel.js";

export const postCovers = async (req, res) => {
    const data = req.body;
    console.log(data)
    const newCovers = Covers(data)  // I pass the data to the model 
    try {
        const findCover = await Covers.find();
        console.log(findCover)
        if (findCover.length > 0) {
            await Covers.deleteOne()
            const covers = await newCovers.save(); 
            console.log('here')
        } else {
            const covers = await newCovers.save();   // to upload de model to the db
        }
        // await Covers.updateOne({}, {$set: data}, {upsert: true})
        res.status(200).json({data: data, message: 'Added Succesfully'})
    } catch (error) {
        res.status(400).json(error);
    }
}

export const getCovers = async (req, res) => {
    try {
        const covers = await Covers.find();   // to upload de model to the db
        res.status(200).json(covers)
    } catch (error) {
        res.status(400).json(error);
    }
}