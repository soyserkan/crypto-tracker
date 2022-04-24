import { CoinName } from "../models/enum/CoinName";
import { BaseService } from "./BaseService";


export class BitcoinService extends BaseService {
    constructor() {
        super(CoinName.BITCOIN);
    }
}