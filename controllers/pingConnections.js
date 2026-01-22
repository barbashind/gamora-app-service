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
        const res = await ping.promise.probe(ip);
        const connectionStatus = res.alive;

        const results = await Promise.all(Array.from({ length: 10 }, () => ping.promise.probe(ip)));
        // const time = results.reduce((acc, res) => acc + res.time, 0) / 10;
        // const losses = results.filter(res => !res.alive).length;

        await updateOldestRecords(pointId, (results.reduce((acc, res) => acc + res.time, 0) / 10), (results.filter(res => !res.alive).length));
        const current = Monitoring.findOne({where: {pointId: pointId}})

        await Monitoring.update(
            { connecting:  (results.reduce((acc, res) => acc + res.time, 0) / 10)},
            { where: { pointId: pointId } }
        );

        if (!connectionStatus && current.connecting === false) {
            // const email = current.responsible; // Предполагается, что email хранится в таблице Monitoring
            // const name = current.name; // Предполагается, что имя точки прохода хранится в таблице Monitoring

            // // Отправка письма
            // await sendEmail(email, name);
            

            // Обновляем статус на "NOT_WORK"
            await Monitoring.update(
                { status: 'NOT_WORK' },
                { where: { pointId } }
            );

        }
        
    } catch (error) {
        console.error(`Error checking connection for pointId ${pointId}:`, error);
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