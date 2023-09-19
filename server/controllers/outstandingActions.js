import OutStanding from "../models/OustandingsModel.js";

export const getAll = async (req, res) => {
    try {
        const outstandings = await OutStanding.find();
        res.status(200).json(outstandings);
    } catch (error) {
        res.status(400).json(error)
    }
}

export const postAll = async (req, res) => {
    const data = req.body;
    try {
        await OutStanding.deleteMany();
        await OutStanding.insertMany(data)
        .then( function () {
            res.status(200).json({success: true, message: 'outstandings insert successfully'})
        })   
        .catch( function (err) {
            res.status(400).json({success: false, error: err, message: 'outstandings insert failed'})
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({success: false, message: 'internal server error'})
    }
}