import express from "express";
import jwt from 'jsonwebtoken';
import multer from "multer";
import { getCompanyData, getUsersData, updateCompanyData, updateUsersData } from "../controllers/Organization.js";
import { getLoftTypes } from "../controllers/DataLists.js";
import { createLoft, getLoft, loftsFilter, updateLoft } from "../controllers/Loft.js";
import { getImageById, getImagesByLoftId, uploadFile } from "../controllers/UploadImages.js";
import { getBookingToday } from "../controllers/Booking.js";
 
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

router.get('/api/gamora/loft/:loftId', authenticateToken, getLoft);
router.post('/api/gamora/loft-create/new', authenticateToken, createLoft);
router.post('/api/gamora/loft-update/:loftId', authenticateToken, updateLoft);
router.post('/api/gamora/lofts/filter', authenticateToken, loftsFilter);

router.post('/api/gamora/upload-image/:loftId', authenticateToken, uploadFile);
router.get('/api/gamora/loft-images/:loftId', authenticateToken, getImagesByLoftId);
router.get('/api/gamora/loft-image/:documentId', authenticateToken, getImageById);

router.get('/api/gamora/bookings-today', authenticateToken, getBookingToday);

export default router;