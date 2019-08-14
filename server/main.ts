import { FastifyInstance }  from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import userRoutes from './modules/routes/users';
import {createReadStream} from 'fs';

import * as fastify from 'fastify';
const fastifyBlipp = require('fastify-blipp');
const fastifyStatic = require('fastify-static');

const path = require('path');

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

server.register(fastifyBlipp);
server.register(userRoutes, {prefix: '/api'});

server.register(fastifyStatic, {
    root: path.join('/Users/constantinosm/Desktop/morf/petapp2/build')
});

server.route({
    method: 'GET',
    url: '/',
    handler: async (req, res) => {
        const stream = createReadStream('/Users/constantinosm/Desktop/morf/petapp2/build/index.html');
        res.type('text/html').send(stream);
    }
});

const start = async () => {
    try {
        await server.listen(3001, '0.0.0.0');
        server.blipp();
        console.log(__dirname);
        server.log.info('server running on port 3001...');
    } catch(err) {
        console.log('ERROR:', err);
        server.log.error(err);
        process.exit(1);
    }
};

start();


// https://medium.com/sharenowtech/fastify-with-typescript-production-ready-integration-2303318ecd9e
