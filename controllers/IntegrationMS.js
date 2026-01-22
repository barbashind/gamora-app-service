import CompanyData from "../models/companyModel.js";
import ProjectMSData from "../models/projectMSModel.js";

export const getCompanies = async (req, res) => {
    try {
        const companies = await CompanyData.findAll();
        res.json(companies);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getProjects = async (req, res) => {
    try {
        const projects = await ProjectMSData.findAll();
        res.json(projects);
    } catch (error) {
        res.json({ message: error.message });
    }  
}




