import fetch from "node-fetch";
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { logger,  healthCheckBotConfig } from "../config";
import MailService from './mail.service';
const { mail } = require("../../hypersign.json");

(() => {
    

    function notifyAdmins() {
        logger.info("HealthCheck:: notifyAdmins(): Method start.");
        const mailService = new MailService({ ...mail });
        const mailTemplateTemp =  `
            Hi Folks,

            The server have been successfully restarted.

            Thanks,
            Health Check Bot
        `
        logger.info("HealthCheck:: notifyAdmins(): Before sending email.");
        mailService.sendEmail(healthCheckBotConfig.ADMIN_EMAILS, mailTemplateTemp, `${healthCheckBotConfig.ENV} : WARNING!!! Whitelist Server Restart on Error`);
        logger.info("HealthCheck:: notifyAdmins(): After sending email.");
        logger.info("HealthCheck:: notifyAdmins(): Method end.");
    }

    async function restartServer(){
        try{
            logger.info("HealthCheck:: restartServer(): Method start.");
            const { stdout, stderr } = await exec(healthCheckBotConfig.SERVER_RESTART_COMMAND);
            if(stdout){
                logger.info("HealthCheck:: restartServer(): Server successfully restarted");
                logger.info('HealthCheck:: restartServer(): stdout ', stdout);

                // Notify admins about this restart...
                notifyAdmins();
            }
            if(stderr){
                throw new Error(stderr);
            }
        }catch(e){
            logger.error('HealthCheck:: restartServer(): stdout ', e.message);
        }finally{
            logger.info("HealthCheck:: restartServer(): Method ends");
        }
    }

    setInterval(() => {
        logger.info("HealthCheck:: init() :: Checking if healthy....");
        fetch(healthCheckBotConfig.HEALTH_CHECK_URL)
        .then(resp => resp.json())
        .then(json => logger.info("HealthCheck:: init() :: " + json))
        .catch(e => {
            logger.error("HealthCheck:: init() :: error "  + e.mesasge);
            // Restart the server
            restartServer()
        })
    }, healthCheckBotConfig.INTERVAL)
})()

    
