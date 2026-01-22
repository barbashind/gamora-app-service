import { Users } from "../models/settingsModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const accounts = await Users.findAll();
        res.json(accounts);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const updateUsers = async (req, res) => {
    try {
        const errors = [];

        // Проверяем на наличие ошибок
        if (errors.length > 0) {
            return res.status(400).json({ errors: errors });
        }

        // Обрабатываем каждую запись в теле запроса
        const accounts = req.body;

        for (const account of accounts) {
            if (account.userId) {
                // Обновляем существующую запись
                await Users.update(account, { where: { userId: account.userId } });
            } else {
                // Создаем новую запись
                await Users.create(account);
            }
        }

        // Получаем все актуальные записи из БД
        const allAccounts = await Users.findAll();
        
        res.json({
            allAccounts
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 

 
export const deleteUser = async (req, res) => {
    try {
        await Users.destroy({
            where: {
                userId: req.params.userId
            }
        });
        res.json({
            "message": "Accounting Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
