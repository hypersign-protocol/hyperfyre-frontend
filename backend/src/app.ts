import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { port, logger, httpsEnabled } from './config';
import http from 'http';
import https from 'https';
import HypersignAuth from 'hypersign-auth-js-sdk';
import routes from './routes';
import { getCerts, corsOptionsDelegate } from './utils';


let server;
async function setupApp() {
    try {

        const app = express();
        if (httpsEnabled == 'true') {
            const cert = await getCerts();
            server = https.createServer(cert, app);

        } else {
            server = http.createServer(app);
        }

        const hypersign = new HypersignAuth(server);

        app.use(express.json());
        app.use(cors(corsOptionsDelegate)); // add appropriate urls
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(express.static('public'));


        // Routes    
        app.use('/api/v1/investor', routes.investor(hypersign));
        app.use('/api/v1/investors', routes.investors());
        app.use('/api/v1/project', routes.project(hypersign));
        app.use("/hs/api/v2/auth", routes.auth(hypersign));

        return true;

    } catch (e) {
        logger.error(e);
        return false;
    }

}

setupApp().then(done => {
    if (done) {
        server.listen(port, () => logger.info(`The server is running on port ${port}`));
    }
});

export default server;

