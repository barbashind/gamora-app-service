import { Equipment, Furniture, Service } from "../models/listSettingsModel.js";
import LoftTypes from "../models/loftTypesModel.js";

 
export const getLoftTypes = async (req, res) => {
    try {
        const loftTypes = await LoftTypes.findAll();
        res.json(loftTypes);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getServices = async (req, res) => {
    const user = req.user;
    try {
        const services = await Service.findAll({
            where: {
                companyId: user.companyId
            }
        });
        res.json(services);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateServices = async (req, res) => {
    try {
        const errors = [];
        // Проверяем на наличие ошибок
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors });
        }
        // Обрабатываем каждую запись в теле запроса
        const services = req.body;

        for (const service of services) {
            if (service.serviceCode) {
                // Обновляем существующую запись
                await Service.update(service, { where: { serviceCode: service.serviceCode } });
            } else {
                // Создаем новую запись
                await Service.create(service);
            }
        }
        // Получаем все актуальные записи из БД
        const allServices = await Service.findAll();
        
        res.json(allServices);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteService = async (req, res) => {
    try {
        await Service.destroy({
            where: {
                serviceCode: req.params.serviceCode
            }
        });
        res.json({
            "message": "Услуга удалена"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getFurniture = async (req, res) => {
    const user = req.user;
    try {
        const services = await Furniture.findAll({
            where: {
                companyId: user.companyId
            }
        });
        res.json(services);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateFurniture = async (req, res) => {
    try {
        const errors = [];
        // Проверяем на наличие ошибок
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors });
        }
        // Обрабатываем каждую запись в теле запроса
        const furnitures = req.body;

        for (const furniture of furnitures) {
            if (furniture.furnitureCode) {
                // Обновляем существующую запись
                await Furniture.update(furniture, { where: { furnitureCode: furniture.furnitureCode } });
            } else {
                // Создаем новую запись
                await Furniture.create(furniture);
            }
        }
        // Получаем все актуальные записи из БД
        const allFurnitures = await Furniture.findAll();
        
        res.json(allFurnitures);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteFurniture = async (req, res) => {
    try {
        await Furniture.destroy({
            where: {
                furnitureCode: req.params.furnitureCode
            }
        });
        res.json({
            "message": "Мебель удалена"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getEquipment = async (req, res) => {
    const user = req.user;
    try {
        const equipments = await Equipment.findAll({
            where: {
                companyId: user.companyId
            }
        });
        res.json(equipments);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateEquipment = async (req, res) => {
    try {
        const errors = [];
        // Проверяем на наличие ошибок
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors });
        }
        // Обрабатываем каждую запись в теле запроса
        const equipments = req.body;

        for (const equipment of equipments) {
            if (equipment.equipmentCode) {
                // Обновляем существующую запись
                await Equipment.update(equipment, { where: { equipmentCode: equipment.equipmentCode } });
            } else {
                // Создаем новую запись
                await Equipment.create(equipment);
            }
        }
        // Получаем все актуальные записи из БД
        const allEquipment = await Equipment.findAll();
        
        res.json(allEquipment);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const deleteEquipment = async (req, res) => {
    try {
        await Equipment.destroy({
            where: {
                equipmentCode: req.params.equipmentCode
            }
        });
        res.json({
            "message": "Оборудование удалено"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}