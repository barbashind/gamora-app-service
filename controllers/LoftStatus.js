import LoftStatus from "../models/loftStatusModel.js";
 
export const getLoftStatus = async (req, res) => {
    try {
        const loftId = req.params.loftId;
        const loft = await LoftStatus.findOne({
            where: {
                loftId: loftId
            }
        });
        res.json(loft);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateLoftStatus = async (req, res) => {
    try {
        await LoftStatus.update(req.body, {
            where: {
                loftId: req.params.loftId
            }
        });
        // Получаем обновленные записи
        const updatedCompanyData = await LoftStatus.findOne({
            where: {
                loftId: req.params.loftId
            }
        });
        res.json(updatedCompanyData);
    } catch (error) {
        res.json({ message: error.message });
    }  
}



