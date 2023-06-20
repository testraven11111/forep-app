const Hapi = require('@hapi/hapi');
const fs = require('fs');
const path = require('path');

const server = Hapi.server({
    port: 8000,
    host: 'localhost',
});

const init = async () => {
    server.route({
        method: 'GET',
        path: '/api/resep',
        handler: (request, h) => {
            const resepPath = path.join(__dirname, './src/resep.json');
            const resepData = fs.readFileSync(resepPath, 'utf8');
            const resepJSON = JSON.parse(resepData);
            return resepJSON;
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();