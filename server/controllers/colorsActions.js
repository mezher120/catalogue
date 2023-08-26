import Colors from "../models/ColorModel.js";

export const postColor = async (req, res) => {
    const data = req.body;
    console.log(data, 'here')
    const newColor = Colors(data)
    try {
        await Colors.updateOne({}, {$set: data}, {upsert: true})
        res.status(200).json({data: data, message: 'Added Succesfully'})
    } catch (error) {
        res.status(400).json(error);
    }
}

 export const getColor = async (req, res) => {
    try {
        const color = await Colors.find();
        res.status(200).json(color);
    } catch (error) {
        res.status(400).json(error);
    }
}