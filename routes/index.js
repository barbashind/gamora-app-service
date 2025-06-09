import express from "express";
import jwt from 'jsonwebtoken';
import { getCompanyData, updateCompanyData } from "../controllers/Organization.js";
 
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

export default router;