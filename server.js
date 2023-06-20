const Hapi = require('@hapi/hapi');
const fs = require('fs');
const path = require('path');

const server = Hapi.server({
    port: process.env.PORT || 8000,
    host: '0.0.0.0',
});

server.route({
    method: 'GET',
    path: '/api/resep',
    handler: (request, h) => {
        const resepPath = path.join(__dirname, './resep.json');
        const resepData = fs.readFileSync(resepPath, 'utf8');
        const resepJSON = JSON.parse(resepData);
        return resepJSON;
    },
});

const startServer = async () => {
    try {
        await server.start();
        console.log(`Server berjalan pada ${server.info.uri}`);
    } catch (error) {
        console.error('Terjadi kesalahan saat memulai server Hapi:', error);
        process.exit(1);
    }
};

startServer();
