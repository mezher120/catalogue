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