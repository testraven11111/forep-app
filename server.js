const Hapi = require('@hapi/hapi');
const path = require('path');

const server = Hapi.server({
    port: 8000,
    host: 'localhost',
});

server.route({
    method: 'GET',
    path: '/api/resep',
    handler: (request, h) => {
        const resepPath = path.join(__dirname, './src/reseplist.js');
        const resepData = require(resepPath);
        return resepData;
    },
});

const init = async () => {
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
