import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { port, logger } from './config';
import http from 'http';
import https  from 'https';
import HypersignAuth from 'hypersign-auth-js-sdk';
import routes from './routes';

const httpsLocalhost = require("https-localhost")()
httpsLocalhost.getCerts().then(cert => {

    const app = express();
    const server = https.createServer(cert, app);
    const hypersign = new HypersignAuth(server);
    

    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(express.static('public'));


    // Routes    
    app.use('/api/v1/investor', routes.investor(hypersign));
    app.use('/api/v1/investors', routes.investors());
    app.use('/api/v1/project', routes.project(hypersign));
    app.use("/hs/api/v2/auth", routes.auth(hypersign));
    server.listen(port, () => logger.info(`The server is running on port ${port}`));

}).catch(e => {
    logger.error(e);
})
