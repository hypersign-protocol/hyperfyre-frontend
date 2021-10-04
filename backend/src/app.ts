import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { port, logger, httpsEnabled } from './config';
import http from 'http';
import https from 'https';
import HypersignAuth from 'hypersign-auth-js-sdk';
import routes from './routes';
import { getCerts, corsOptionsDelegate } from './utils/https';
import apiErrorHandler from './error/apiErrorHandler';
import process from "process";
import helment from 'helmet';
import DB from './dbConn';
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
        
        // Setup Authentication
        const hypersign = new HypersignAuth(server);

        // Setup Db connection
        DB.openConnection().then(x => logger.info(x)).catch(e => logger.error(e));

        app.use(helment())
        app.disable('x-powered-by')

        app.use(express.json());
        app.use(cors(corsOptionsDelegate)); // add appropriate urls
        app.use(cookieParser());
        app.use(express.static('public'));


        // Routes    
        app.use('/api/v1/investor', routes.investor(hypersign));
        app.use('/api/v1/project', routes.project(hypersign));
        app.use("/hs/api/v2/auth", routes.auth(hypersign));
        app.use("/api/v1/twitter", routes.twitter(hypersign));
        app.use("/api/v1/plan", routes.plan());
        app.use("/api/v1/subscription", routes.subscrition(hypersign));

        app.use(apiErrorHandler);

        app.get("/api/v1/health", (req, res) => {
            res.status(200).json({ msg: "All good folks, I am healthy :) !"});
        })

        return true;

    } catch (e) {
        logger.error(e);
        return false;
    }

}

setupApp().then(done => {
    if (done) {
        server.listen(port, () => logger.info(`PID: ${process.pid} :: The server is running on port ${port}`));
    }
});

process.on('SIGINT', function() {
    DB.closeConnection().then(() => {
        logger.info('Mongoose default connection disconnected through app termination');
    })
});

//  testing husky

function t(){

}

const t1 = "";

export default server;

