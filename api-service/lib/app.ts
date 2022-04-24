import express, { Application, Router } from "express";
import BitcoinRoute from "./routes/BitcoinRoute";
import * as cors from 'cors';
import helmet from "helmet";
import { ErrorHandlerMiddleware } from '@serkans/error-handler';
import { loggerService } from "@serkans/log-service";
import { queueService } from "./services/QueueService";
import * as http from 'http'

export class App {
    public app: Application;
    constructor(private port: number) {
        this.app = express();
        this.middlewares();
        this.routes();
    }
    private middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors.default());
        this.app.use(helmet());
    }
    async rabbitmq(url: string) {
        try {
            if (url) {
                await queueService.connect(url);
                loggerService.logger.debug('[RabbitMQ] connection successful');
            }
        } catch (error) {
            loggerService.logger.error('[RabbitMQ] connection error: ' + error);
            process.exit(1);
        }
    }
    private routes() {
        const router: Router = express.Router();
        this.app.use("/", router);
        this.app.use(loggerService.logMiddleware);
        this.app.use('/api/candles', BitcoinRoute);
        this.app.use(loggerService.errorLogMiddleware);
        this.app.use(ErrorHandlerMiddleware);
    }
    async listen(server: http.Server) {
        server.listen(this.port, () => {
            loggerService.logger.debug(`Server => listening to port: ${this.port}!`);
        });
    }
}