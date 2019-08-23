import { FastifyInstance }  from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { RedisHelper } from './modules/helpers/RedisHelper';
import { createReadStream } from 'fs';

import * as fastify from 'fastify';
import * as session from 'fastify-session';
import * as cookie from 'fastify-cookie';
import * as path from 'path';

const fastifyBlipp = require('fastify-blipp');
const fastifyStatic = require('fastify-static');
const gql = require('fastify-gql');
const dotenv = require('dotenv');


import userRoutes from './modules/routes/users';
import db from './modules/db';
import schema from './gql-schema';
import {MainAppHelper} from './modules/helpers/MainAppHelper';


dotenv.config();
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

RedisHelper.createRedisClient();

server.register(fastifyBlipp);
server.register(userRoutes, {prefix: '/api'});
server.register(db);
server.register(gql, {
    schema,
    graphiql: true
});

const opts = MainAppHelper.getSessionOptions();
server.register(cookie);
server.register(session, opts);

server.register(fastifyStatic, {
    root: path.join(__dirname,'..', 'build')
});

// https://accounts.google.com/o/oauth2/v2/auth?client_id=162096347598-eov26og5dif8for0an3sc114o9cl5321.apps.googleusercontent.com&response_type=code&scope=https://www.googleapis.com/auth/gmail.send&redirect_uri=http://localhost:3001/auth/google/callback&access_type=offline

server.route({
    method: 'GET',
    url: '/',
    handler: async (req, res) => {
        const stream = createReadStream('../build/index.html');
        res.type('text/html').send(stream);
    }
});

server.route({
    method: ['GET', 'POST'],
    url: '/auth/google/callback',
    handler: async (req, res) => {
        // should make sure that token is valid py sending a GET here:
        // https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=[access-token]
        console.log('REACHED CB HANDLER:', req);
        res.send({success: true});
    }
});

const start = async () => {
    try {
        await server.listen(3001, '0.0.0.0');
        server.blipp();
        server.log.info('server running on port 3001...');
    } catch(err) {
        console.log('ERROR:', err);
        server.log.error(err);
        process.exit(1);
    }
};

start();


// https://medium.com/sharenowtech/fastify-with-typescript-production-ready-integration-2303318ecd9e
