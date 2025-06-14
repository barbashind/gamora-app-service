import CompanyData from "../models/organizationModel.js";
import UserData from "../models/usersModel.js";
 
export const getCompanyData = async (req, res) => {
    try {
        const user = req.user;
        const companyData = await CompanyData.findOne({
            where: {
                companyId: user.companyId
            }
        });
        res.json(companyData);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateCompanyData = async (req, res) => {
    try {
        const user = req.user;
        await CompanyData.update(req.body, {
            where: {
                companyId: user.companyId
            }
        });
        // Получаем обновленные записи
        const updatedCompanyData = await CompanyData.findOne({
            where: {
                companyId: user.companyId
            }
        });
        res.json(updatedCompanyData);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getUsersData = async (req, res) => {
    try {
        const user = req.user;
        const usersData = await UserData.findAll({
            where: {
                companyId: user.companyId
            }
        });
        res.json(usersData);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const updateUsersData = async (req, res) => {
    try {
        const userId = req.params.userId;
        await UserData.update(req.body, {
            where: {
                userId: userId
            }
        });

        const usersData = await UserData.findOne({
            where: {
                userId: userId
            }
        });
        
        res.json(usersData);
    } catch (error) {
        res.json({ message: error.message });
    }  
}