import GateData from "../models/gateModel.js";
import ObjectData from "../models/objectModel.js";
import PlaceData from "../models/placeModel.js";

export const getAllGates = async (req, res) => {
    try {
        const gates = await GateData.findAll();
        res.json(gates);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getObjects = async (req, res) => {
    try {
        const objects = await ObjectData.findAll();
        res.json(objects);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getPlaces = async (req, res) => {
    try {
        const places = await PlaceData.findAll();
        res.json(places);
    } catch (error) {
        res.json({ message: error.message });
    }  
}




