import 'dotenv/config';
import { BitcoinService } from "./services/BitcoinService";
import { queueService } from './services/QueueService';
import { Static } from './static';
import { loggerService } from "@serkans/log-service";


(async function init() {
    await loggerService.connect({ isDevelopment: Static.isDevelopment(), logDir: Static.log, serviceName: "scheduler-service" });
    if (process.env.RabbitMQ_URL) {
        try {
            await queueService.connect(process.env.RabbitMQ_URL);
            console.log('[RabbitMQ] connection successful');
        } catch (error) {
            console.error('[RabbitMQ] connection error: ' + error);
            process.exit(1);
        }
    }
    const bitcoinService = new BitcoinService();
    bitcoinService.generateCandle();
})();