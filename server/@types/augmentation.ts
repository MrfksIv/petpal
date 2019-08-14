import { Server, IncomingMessage, ServerResponse } from 'http';
import {Db} from '../modules/db';

declare module 'fastify' {
    // @ts-ignore
    export interface FastifyInstance<
        HttpServe = Server,
        HttpRequest = IncomingMessage,
        HttpResponse = ServerResponse
    > {
        blipp(): void;
        db: Db;
    }
}
