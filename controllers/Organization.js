import CompanyData from "../models/organizationModel.js";
 
export const getCompanyData = async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
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