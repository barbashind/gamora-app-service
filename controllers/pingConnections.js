import ping from 'ping';
import Monitoring from '../models/monitoringModel.js';
// import ConnectionHour from '../models/connectionsHourModel.js';
// import ConnectionDay from '../models/connectionsDayModel.js';
import Connection from '../models/connectionsModel.js';
// import ConnectionMonth from '../models/connectionsMothModel.js';

const createInitialRecords = async (pointId) => {
    const createPromises = [];

    const createRecordWithDelay = async (model, count) => {
        for (let i = 0; i < count; i++) {
            createPromises.push(model.create({ pointId }));
            await new Promise(resolve => setTimeout(resolve, 1000)); // Задержка 1 секунда
        }
    };

    await createRecordWithDelay(Connection, 8640);
    await Promise.all(createPromises);
};

const updateOldestRecords = async (pointId, time, losses) => {
    const oldestConnection = await Connection.findOne({ where: { pointId: pointId }, order: [['updatedAt', 'ASC']] });
    if (oldestConnection) {
        await oldestConnection.update({ time: (isNaN(time) ? 0 : time), losses: losses });
    }
};


const checkConnection = async (pointId, ip) => {
    try {
        const results = await Promise.all(Array.from({ length: 10 }, () => ping.promise.probe(ip)));
        
        // Вычисляем среднее только по успешным пингам
        const successful = results.filter(res => res.alive === true);
        let avgTime = 0;
        if (successful.length > 0) {
            const totalTime = successful.reduce((acc, res) => acc + res.time, 0);
            avgTime = totalTime / successful.length;
        } else {
            avgTime = 0; // все пинги упали
        }

        const losses = results.filter(res => !res.alive).length;

        await updateOldestRecords(pointId, avgTime, losses);

        // Исправляем: await для findOne
        const current = await Monitoring.findOne({where: {pointId: pointId}});

        await Monitoring.update(
            { connecting: avgTime },
            { where: { pointId: pointId } }
        );

        // Проверка на полную потерю связи: если все пинги упали (losses === 10) или avgTime === 0
        // if (losses === 10) {
        //     // Отправка письма (закомментировано)
        //     // await sendEmail(email, name);
            
        //     // Обновляем статус на "NOT_WORK"
        //     await Monitoring.update(
        //         { status: 'NOT_WORK' },
        //         { where: { pointId } }
        //     );
        // }
        
    } catch (error) {
        console.error(`Error checking connection for pointId ${pointId}:`, error);
        // При ошибке записываем 0
        try {
            await Monitoring.update(
                { connecting: 0 },
                { where: { pointId: pointId } }
            );
        } catch (updateError) {
            console.error(`Failed to update connecting to 0 for pointId ${pointId}:`, updateError);
        }
    }
};

setInterval(async () => {
    try {
        const points = await Monitoring.findAll({ where: { status: 'WORK' } });

        for (const point of points) {
            const connectionExists = await Connection.findOne({ where: { pointId: point.pointId } });
            if (!connectionExists) {
                await createInitialRecords(point.pointId);
            }
            
            await checkConnection(point.pointId, point.IPadress); // добавлено await для асинхронного вызова

        }
    } catch (error) {
        console.error('Error fetching points:', error);
    }
}, 300000);1