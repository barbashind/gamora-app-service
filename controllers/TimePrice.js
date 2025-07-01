import TimePrice from "../models/timePriceModel.js";

 
export const getTimePrice= async (req, res) => {
    try {
        const timePrices = await TimePrice.findAll({
            where: {
                loftId: req.params.loftId
            }
        });
        res.json(timePrices);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateTimePrices = async (req, res) => {
    try {
        const errors = [];
        // Проверяем на наличие ошибок
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors });
        }
        // Обрабатываем каждую запись в теле запроса
        const timePrices = req.body;
        
        const timePricesOld = await TimePrice.findAll({
            where: {
                loftId: req.params.loftId
            }
        });

        for (const timePrice of timePricesOld) {
                await TimePrice.destroy({
                    where: {
                        timepriceId: timePrice.timepriceId

                    }});
        }
        for (const timePrice of timePrices) {
                await TimePrice.create({...timePrice, loftId: req.params.loftId});
        }

        const allTimePrices = await TimePrice.findAll({
            where: {
                loftId: req.params.loftId
            }
        });
        
        res.json(allTimePrices);
    } catch (error) {
        res.json({ message: error.message });
    }  
}