import express from "express";
import jwt from 'jsonwebtoken';
import { getCompanies, getProjects } from "../controllers/IntegrationMS.js";
import { getAllGates, getObjects, getPlaces } from "../controllers/Gates.js";
import { createPoint, deletePoint, getAllPoints, getPointById, getTestsById, getTestsDayById, getTestsHourById, getTestsMonthById, pointsFilter, updatePoint } from "../controllers/Monitoring.js";
import { deleteUser, getAllUsers, updateUsers } from "../controllers/Settings.js";
 
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

router.get('/api/ufch/companies', authenticateToken, getCompanies);
router.get('/api/ufch/projects', authenticateToken, getProjects);
router.get('/api/ufch/objects', authenticateToken, getObjects);
router.get('/api/ufch/places', authenticateToken, getPlaces);
router.get('/api/ufch/gates', authenticateToken, getAllGates);

router.post('/api/ufch/monitoring/filter', authenticateToken, pointsFilter);
router.get('/api/ufch/monitoring/:pointId', authenticateToken, getPointById);
router.get('/api/ufch/monitoring-all', authenticateToken, getAllPoints);

router.post('/api/ufch/create-point', authenticateToken, createPoint);
router.post('/api/ufch/update-point/:pointId', authenticateToken, updatePoint);
router.delete('/api/ufch/delete-point/:pointId', authenticateToken, deletePoint);

router.get('/api/ufch/tests/:pointId', authenticateToken, getTestsById);
router.get('/api/ufch/tests-hour/:pointId', authenticateToken, getTestsHourById);
router.get('/api/ufch/tests-day/:pointId', authenticateToken, getTestsDayById);
router.get('/api/ufch/tests-month/:pointId', authenticateToken, getTestsMonthById);

router.get('/api/ufch/users/all', authenticateToken, getAllUsers);
router.post('/api/ufch/update-users', authenticateToken, updateUsers);
router.delete('/api/ufch/delete-user/:id', authenticateToken, deleteUser);

export default router;