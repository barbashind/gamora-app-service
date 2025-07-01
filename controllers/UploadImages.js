import Images from '../models/imagesModel.js'; // Импортируйте вашу модель
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/data/uploads/');
    },
    filename: (req, file, cb) => {
        // Генерируем уникальное имя для файла
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Сохраняем файл с уникальным именем
    }
});
// Создание экземпляра multer
const upload = multer({ storage })

// Функция для обработки загрузки файла
export const uploadFile = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).json({ message: 'Error uploading file.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        try {
            // Сохранение информации о загруженном файле в базе данных
            const document = await Images.create({
                loftId: req.params.loftId,
                fileName: req.file.filename,
                path: `/public/data/uploads/${req.file.filename}`, // Путь к файлу
                fileSize: req.file.size, // Размер файла
                fileExtension: path.extname(req.file.originalname).toUpperCase() // Расширение файла в верхнем регистре
            });

            res.json({
                message: 'File processed and data inserted successfully!',
                documentId: document.documentId, // Используйте _id для идентификатора документа
                fileName: document.fileName,
                fileSize: document.fileSize,
                fileExtension: document.fileExtension
            });
        } catch (error) {
            console.error('Error saving file to database:', error);
            res.status(500).json({ message: error.message });
        }
    });
};
// Функция для обработки загрузки файла
export const uploadMainFile = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            console.error('Error uploading file:', err);
            return res.status(500).json({ message: 'Error uploading file.' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        try {
            // Сохранение информации о загруженном файле в базе данных
            const document = await Images.create({
                loftId: req.params.loftId,
                mainImage: true,
                fileName: req.file.filename,
                path: `/public/data/uploads/${req.file.filename}`, // Путь к файлу
                fileSize: req.file.size, // Размер файла
                fileExtension: path.extname(req.file.originalname).toUpperCase() // Расширение файла в верхнем регистре
            });

            res.json({
                message: 'File processed and data inserted successfully!',
                documentId: document.documentId, // Используйте _id для идентификатора документа
                fileName: document.fileName,
                fileSize: document.fileSize,
                fileExtension: document.fileExtension
            });
        } catch (error) {
            console.error('Error saving file to database:', error);
            res.status(500).json({ message: error.message });
        }
    });
};

export const getImagesByLoftId = async (req, res) => {
    const { loftId } = req.params; // Получаем loftId из параметров запроса

    try {
        // Находим все изображения по loftId
        const images = await Images.findAll({where: {
            loftId: loftId,
            mainImage: {
                    [Op.not]: true,
                },
        }  });

        if (!images || images.length === 0) {
            return res.status(404).json({ message: 'No images found for this loftId.' });
        }

        // Извлекаем пути к файлам
        const filePaths = images.map(image => ({
            documentId: image.documentId,
            fileName: image.fileName,
            path: image.path,
            fileSize: image.fileSize,
            fileExtension: image.fileExtension,
        }));

        // Возвращаем массив путей к файлам в ответе
        res.json(filePaths);
    } catch (error) {
        console.error('Error retrieving images:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getMainImageByLoftId = async (req, res) => {
    const { loftId } = req.params; // Получаем loftId из параметров запроса

    try {
        // Находим все изображения по loftId
        const image = await Images.findOne({where: {
            loftId: loftId,
            mainImage: true,
        }  });

        if (!image || image.length === 0) {
            return res.json(undefined);
        }

        // Возвращаем массив путей к файлам в ответе
        res.json(image.documentId);
    } catch (error) {
        console.error('Error retrieving images:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getImageById = async (req, res) => {
    const documentId  = req.params.documentId; // Получаем imageId из параметров запроса

    try {
        // Находим изображение по ID
        const image = await Images.findOne({where:{documentId: documentId}});

        if (!image) {
            return res.status(404).json({ message: 'Image not found.' });
        }

        // Определяем путь к файлу
        const filePath = path.join('C:/gamora-app/gamora-app-service', image.path) // Измените путь на нужный

        // Проверяем, существует ли файл
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).json({ message: 'File not found.' });
            }
            // Отправляем файл как ответ
            res.sendFile(filePath);
        });
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteImageById = async (req, res) => {
    const documentId = req.params.documentId; // Получаем documentId из параметров запроса

    try {
        // Находим изображение по ID
        const image = await Images.findOne({ where: { documentId: documentId } });

        if (!image) {
            return res.status(404).json({ message: 'Image not found.' });
        }

        // Определяем путь к файлу
        const filePath = path.join('C:/gamora-app/gamora-app-service', image.path); // Измените путь на нужный

        // Удаляем изображение из базы данных
        await Images.destroy({ where: { documentId: documentId } });

        // Проверяем, существует ли файл, и удаляем его
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                return res.status(500).json({ message: 'Error deleting file.' });
            }
            res.status(200).json({ message: 'Image deleted successfully.' }); // Возвращаем успешный ответ
        });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ message: error.message });
    }
};