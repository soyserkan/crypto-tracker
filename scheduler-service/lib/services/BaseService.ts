
import { loggerService } from "@serkans/log-service";
import axios from "axios"
import Candle from "../models/Candle";
import { CoinName } from "../models/enum/CoinName"
import { Period } from "../models/enum/Period";
import { queueService } from "./QueueService";



export class BaseService {

    public readonly _coin: CoinName;

    constructor(coin: CoinName) {
        this._coin = coin;
    }

    async readMarketPrice(): Promise<any> {
        try {
            const result = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${this._coin}&vs_currencies=usd`);
            const data = result.data
            const price = data[this._coin].usd
            return price
        } catch (error) {
            loggerService.logger.error(error);
        }
    }
    async generateCandle() {
        while (true) {
            const loopTimes = Period.FIVE_MINUTES / Period.TEN_SECONDS
            const candle = new Candle(CoinName.BITCOIN)

            for (let i = 0; i < loopTimes; i++) {
                const price = await this.readMarketPrice()
                candle.addValue(price)
                loggerService.logger.debug(`Market price #${i + 1} of ${loopTimes}`)
                await new Promise(r => setTimeout(r, Period.TEN_SECONDS))
            }

            candle.closeCandle()
            queueService.publish("CANDLE", candle.toSimpleObject());
            loggerService.logger.debug('Candle sent to queue');
        }
    }
}