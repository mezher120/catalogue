import furniture from "../models/furnituresModel.js";

/* CRUD functions */

export const getAllFurnitures = async (req, res) => {
    try {
        console.log('first')
        const furnitures = await furniture.find();
        res.status(200).json(furnitures);
    } catch (error) {
        console.log('something goes wrong')
        res.status(400).json(error)
    }
}

export const createFurniture = async (req, res) => {
    const data = req.body;
    const newFurniture = furniture(data) 
    try {
        await newFurniture.save();
        res.status(200).json(data);
} catch (error) {
        res.status(400).json(error)
    }
}

export const getOneFurniture = async (req, res) => {
    const data = req.query
    try {
        let furnitureToUpdate = await furniture.findOne({codigo: data.id})
        res.status(200).json(furnitureToUpdate)
    } catch (error) {
        res.status(400).json(error);
    }
}

export const deleteOneFurniture = async (req, res) => {
    const id = req.query.id;
    try {
        let furnitureDeleted = await furniture.deleteOne({codigo: id});
        console.log('deleted', furnitureDeleted)
        res.status(200).json(furnitureDeleted);
    } catch (error) {
        res.status(400).json(error);
    }
}

export const updateOneFurniture = async (req, res) => {
    const {id, data} = req.body;
    console.log(id)
    console.log(data)
    try {
        let furnitureUpdated = await furniture.findOneAndUpdate({codigo: id}, data, {
            new: true
          });
        res.status(200).json(furnitureUpdated);
    } catch (error) {
        res.status(400).json(error)
    }
}