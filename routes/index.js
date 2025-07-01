import express from "express";
import jwt from 'jsonwebtoken';
import multer from "multer";
import { getCompanyData, getUsersData, updateCompanyData, updateUsersData } from "../controllers/Organization.js";
import { deleteEquipment, deleteFurniture, deleteService, getEquipment, getFurniture, getLoftTypes, getServices, updateEquipment, updateFurniture, updateServices } from "../controllers/DataLists.js";
import { createLoft, getLoft, loftsFilter, updateLoft } from "../controllers/Loft.js";
import { deleteImageById, getImageById, getImagesByLoftId, getMainImageByLoftId, uploadFile, uploadMainFile } from "../controllers/UploadImages.js";
import { getBookingToday } from "../controllers/Booking.js";
import { getTimePrice, updateTimePrices } from "../controllers/TimePrice.js";
import { getLoftStatus, updateLoftStatus } from "../controllers/LoftStatus.js";
 
const router = express.Router();

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Извлечение токена из заголовка

    if (!token) {
        return res.status(401).json({ valid: false, message: 'Токен отсутствует' }); // Токен отсутствует
    }

    jwt.verify(token, 'secret-key-3', (err, user) => {
        if (err) {
            return res.status(403).json({ valid: false, message: 'Токен недействителен' }); // Токен недействителен
        }
        req.user = user; // Сохранение информации о пользователе в запросе
        next(); // Переход к следующему middleware или маршруту
    });
};

router.get('/api/gamora/company-data', authenticateToken, getCompanyData);
router.post('/api/gamora/company-data-update', authenticateToken, updateCompanyData);

router.get('/api/gamora/users-data', authenticateToken, getUsersData);
router.post('/api/gamora/user-data-update/:userId', authenticateToken, updateUsersData);

router.get('/api/gamora/loft-types', authenticateToken, getLoftTypes);
router.get('/api/gamora/services-list', authenticateToken, getServices);
router.get('/api/gamora/furniture-list', authenticateToken, getFurniture);
router.get('/api/gamora/equipment-list', authenticateToken, getEquipment);
router.post('/api/gamora/services-list/update', authenticateToken, updateServices);
router.post('/api/gamora/furniture-list/update', authenticateToken, updateFurniture);
router.post('/api/gamora/equipment-list/update', authenticateToken, updateEquipment);

// Удаление услуги
router.delete('/api/gamora/services-list/delete/:serviceCode', authenticateToken, deleteService);

// Удаление мебели
router.delete('/api/gamora/furniture-list/delete/:furnitureCode', authenticateToken, deleteFurniture);

// Удаление оборудования
router.delete('/api/gamora/equipment-list/delete/:equipmentCode', authenticateToken, deleteEquipment);

router.get('/api/gamora/loft/:loftId', authenticateToken, getLoft);
router.post('/api/gamora/loft-create/new', authenticateToken, createLoft);
router.post('/api/gamora/loft-update/:loftId', authenticateToken, updateLoft);
router.post('/api/gamora/lofts/filter', authenticateToken, loftsFilter);

router.get('/api/gamora/loft-status/:loftId', authenticateToken, getLoftStatus);
router.post('/api/gamora/loft-status-update/:loftId', authenticateToken, updateLoftStatus);

router.post('/api/gamora/upload-image/:loftId', authenticateToken, uploadFile);
router.post('/api/gamora/upload-image-main/:loftId', authenticateToken, uploadMainFile);
router.get('/api/gamora/loft-images/:loftId', authenticateToken, getImagesByLoftId);
router.get('/api/gamora/loft-image-main/:loftId', authenticateToken, getMainImageByLoftId);
router.get('/api/gamora/loft-image/:documentId', authenticateToken, getImageById);
router.delete('/api/gamora/delete-loft-image/:documentId', authenticateToken, deleteImageById);

router.post('/api/gamora/update-time-price/:loftId', authenticateToken, updateTimePrices);
router.get('/api/gamora/time-price/:loftId', authenticateToken, getTimePrice);

router.get('/api/gamora/bookings-today', authenticateToken, getBookingToday);



export default router;