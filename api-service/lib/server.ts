import { App } from "./app";
import 'dotenv/config';
import http from 'http';
import { Static } from "./static";
import { loggerService } from "@serkans/log-service";
import { connectMongo } from "./models/init/db";
import { BitcoinSubscriber } from "./events/BitcoinSubscriber";
import { socketService } from "./services/SocketService";


(async function init() {
    await loggerService.connect({ isDevelopment: Static.isDevelopment(), logDir: Static.log, serviceName: "api-service" });
    const node = new App(process.env.PORT);
    const server = http.createServer(node.app);
    await socketService.connect(server);
    await node.listen(server);
    if (process.env.MONGO_URL) {
        await connectMongo();
    }
    if (process.env.RabbitMQ_URL) {
        await node.rabbitmq(process.env.RabbitMQ_URL);
    }
    new BitcoinSubscriber().listenChannels();
})();