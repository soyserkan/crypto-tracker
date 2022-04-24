import { loggerService } from "@serkans/log-service";
import { ICandleDocument } from "../models/interface/ICandle";
import { BitcoinService } from "../services/BitcoinService";
import { queueService } from "../services/QueueService";
import { socketService } from "../services/SocketService";
import { QueueName } from "./enums/QueueName";
export class BitcoinSubscriber {
    private bitcoinService: BitcoinService;
    constructor() {
        this.bitcoinService = new BitcoinService();
    }
    async listenChannels() {
        var self = this;
        queueService.listen(QueueName.CANDLE, function (response: any) {
            loggerService.logger.debug(response.fields.exchange + " queue listening...");
            self.candleFind(response);
        });
    }
    async candleFind(msg: any) {
        if (msg && msg.content) {
            queueService.channel.ack(msg);
            const candle: ICandleDocument = JSON.parse(msg.content.toString());
            if (candle) {
                await this.bitcoinService.create(candle);
                console.log('Candle saved to database');
                socketService.io.emit("newCandle", candle);
                console.log('New candle emited by web socket');
            }
        }
    }
}