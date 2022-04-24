import { ICandleDocument } from "../models/interface/ICandle";
import { BitcoinRepository } from "../repositories/BitcoinRepositories";

export class BitcoinService {
    private bitcoinRepository: BitcoinRepository
    constructor() {
        this.bitcoinRepository = new BitcoinRepository();
    }
    findLastCandles(quantity: number): Promise<any> {
        return this.bitcoinRepository.findLastCandles(quantity);
    }
    create(candle: ICandleDocument): Promise<any> {
        return this.bitcoinRepository.create(candle);
    }
}