import * as path from 'path';
const oauth2Module = require('simple-oauth2')

const credentials = {
    client: {
        id: '<client-id>',
        secret: '<client-secret>'
    },
    auth: {
        tokenHost: 'https://api.oauth.com'
    }
};
oauth2Module.create(credentials);

