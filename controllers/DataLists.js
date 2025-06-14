import LoftTypes from "../models/loftTypesModel.js";

 
export const getLoftTypes = async (req, res) => {
    try {
        const loftTypes = await LoftTypes.findAll();
        res.json(loftTypes);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

