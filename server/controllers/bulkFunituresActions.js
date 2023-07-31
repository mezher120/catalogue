import furniture from "../models/furnituresModel.js";


export const furnitureBulkInsert = async (req, res) => {
    const data = req.body;
    try {
        await furniture.insertMany(data)
        .then( function () {
            res.status(200).json({success: true, message: 'furniture bulk insert successfully'})
        })   
        .catch( function () {
            res.status(400).json({success: false, error: err, message: 'furniture bulk insert failed'})
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({success: false, message: 'internal server error'})
    }
}

export const furnitureBulkUpdate = async (req, res) => {
    const data = req.body;
    try {
        for (let i = 0; i < data.length; i++) {
                const query = { codigo: data[i].codigo }
                await furniture.findOneAndUpdate(query, data[i], {upsert: true, new: true})
        }
        res.status(200).json({success: true, message: 'furniture bulk updated successfully'})
    } catch (error) {
        console.log('error', error);
        res.status(500).json({success: false, message: 'internal server error'})
    }
}

export const furnitureBulkDelete = async (req, res) => {
    try {
        await furniture.deleteMany();
        res.status(200).json({success: true, message: 'All furnitures deleted'});
    } catch (error) {
        res.status(400).json({success: false, message: 'Delete Failed'});
    }
}
