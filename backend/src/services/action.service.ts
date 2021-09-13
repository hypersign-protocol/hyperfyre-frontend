import ActionModel, { IEventAction, EventActionType } from "../models/actions";

export  default class ActionService{
    constructor(){

    }

    async addAction( actionParams : IEventAction){
        const newAction = await ActionModel.create({
            ...actionParams
        })

        return newAction;
    }

    async getEventActions({ eventId }){
        return await ActionModel.find({ eventId });
    }

}

