import { loggerService } from "@serkans/log-service";
import mongoose from "mongoose";

export async function connectMongo() {
    if (process.env.MONGO_URL) {
        mongoose.connection.on('error', error => {
            loggerService.logger.error('[MongoDB] connection error ' + error);
        })
        mongoose.connection.on('connected', () => {
            loggerService.logger.debug('[MongoDB] connection succesfull');
        });
        mongoose.connection.on('disconnected', () => {
            loggerService.logger.error('MongoDB disconnected!');
        })
        await mongoose.connect(process.env.MONGO_URL);
    }
};
