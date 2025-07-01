import LoftData from "../models/loftMamagmentModel.js";
 
export const getLoft = async (req, res) => {
    try {
        const loftId = req.params.loftId;
        const loft = await LoftData.findOne({
            where: {
                loftId: loftId
            }
        });
        res.json(loft);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const loftsFilter = async (req, res) => {
    try {
        const whereConditions = {};
        const orderBy = [];
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
        
        const { count, rows } = await LoftData.findAndCountAll({
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

export const createLoft = async (req, res) => {
    try {

        const { name, type, size, address, guestCountMax, loftDescription } = req.body;

        const user = req.user;

        const data = {...req.body, companyId: user.companyId}
        
        // Массив для хранения ошибок
        const errors = [];

        if (!name) {
            errors.push({
                message: "Заполните наименование",
                field: "name"
            });
        }
        if (!type) {
            errors.push({
                message: "Выберите тип помещения",
                field: "type"
            });
        }
        if (size === null || size === undefined) {
            errors.push({
                message: "Укажите площадь",
                field: "size"
            });
        }
        if (!address) {
            errors.push({
                message: "Укажите адрес",
                field: "address"
            });
        }
        if (!guestCountMax) {
            errors.push({
                message: "Укажите число гостей",
                field: "guestCountMax"
            });
        }
        if (!loftDescription) {
            errors.push({
                message: "Введите описание лофта",
                field: "loftDescription"
            });
        }

        // Если есть ошибки, возвращаем ответ с ошибками
        if (errors.length > 0) {
            return res.status(400).json({
                timestamp: new Date().toISOString(),
                status: 400,
                error: "Bad Request",
                path: req.originalUrl,
                details: errors
            });
        }

        const createdLoft = await LoftData.create(data);

        res.json(createdLoft);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateLoft = async (req, res) => {
    try {
        await LoftData.update(req.body, {
            where: {
                loftId: req.params.loftId
            }
        });
        // Получаем обновленные записи
        const updatedCompanyData = await LoftData.findOne({
            where: {
                loftId: req.params.loftId
            }
        });
        res.json(updatedCompanyData);
    } catch (error) {
        res.json({ message: error.message });
    }  
}



