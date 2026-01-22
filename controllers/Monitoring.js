import Monitoring from '../models/monitoringModel.js';
import Connection from '../models/connectionsModel.js';
import ConnectionHour from '../models/connectionsHourModel.js';
import ConnectionDay from '../models/connectionsDayModel.js';
import ConnectionMonth from '../models/connectionsMothModel.js';
import { Op } from "sequelize";
 


export const pointsFilter = async (req, res) => {
    try {
        const whereConditions = {};
        const orderBy = [];
        if (req.body.type) {
            whereConditions.type = {
                    [Op.in]: req.body.type
                };
        }
        if (req.query.sort) {
            const sortParams = req.query.sort.split('&');
            sortParams.forEach(param => {
                const [fieldname, order] = param.split(',');
                if (fieldname && order) {
                    orderBy.push([fieldname, order]);
                }
            });
        }
        const page = parseInt(req.query.page) || 0; // Номер страницы (по умолчанию 0)
        const size = parseInt(req.query.size) || 10; // Размер страницы (по умолчанию 10)
        
        const { count, rows } = await Monitoring.findAndCountAll({
            where: whereConditions,
            order: orderBy.length ? orderBy : null,
            limit: size,
            offset: page * size,
        });

        
        // Формируем ответ в формате TPageableResponse
        const response = {
            content: rows,
            pageable: {
                sort: orderBy.length ? orderBy : null,
                pageNumber: page,
                pageSize: size,
                paged: true,
                unpaged: false,
            },
            dataHide: false,
            empty: rows.length === 0,
            first: page === 0,
            last: page >= Math.ceil(count / size) - 1,
            number: page,
            numberOfElements: rows.length,
            size: size,
            sort: orderBy.length ? orderBy : null,
            totalElements: count,
            totalPages: Math.ceil(count / size),
        };
    res.json(response);

    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getPointById = async (req, res) => {
    try {
        const expense = await Monitoring.findOne({
            where: {
                pointId: req.params.pointId
            }
        });
        res.json(expense);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getAllPoints = async (req, res) => {
    try {
        const accounts = await Monitoring.findAll();
        res.json(accounts);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createPoint = async (req, res) => {
    try {
        const errors = [];
        const item = req.body
        
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors });
        }
        const createdMonitoring = await Monitoring.create(req.body);
        res.json({
            createdMonitoring
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updatePoint = async (req, res) => {
    try {
        await Monitoring.update(req.body, {
            where: {
                pointId: req.params.pointId
            }
        });
        // Получаем обновленные записи
        const updatedExpense= await Monitoring.findOne({
            where: {
                pointId: req.params.pointId
            }
        });
        res.json({
            updatedExpense
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deletePoint = async (req, res) => {
    try {
        await Monitoring.destroy({
            where: {
                pointId: req.params.pointId
            }
        });
        res.json({
            "message": "Building Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getTestsById = async (req, res) => {
    try {
        const expenses = await Connection.findAll({
            where: {
                pointId: req.params.pointId
            }
        });
        res.json(expenses);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getTestsHourById = async (req, res) => {
    try {
        const expenses = await ConnectionHour.findAll({
            where: {
                pointId: req.params.pointId
            }
        });
        res.json(expenses);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getTestsDayById = async (req, res) => {
    try {
        const expenses = await ConnectionDay.findAll({
            where: {
                pointId: req.params.pointId
            }
        });
        res.json(expenses);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getTestsMonthById = async (req, res) => {
    try {
        const expenses = await ConnectionMonth.findAll({
            where: {
                pointId: req.params.pointId
            }
        });
        res.json(expenses);
    } catch (error) {
        res.json({ message: error.message });
    }  
}