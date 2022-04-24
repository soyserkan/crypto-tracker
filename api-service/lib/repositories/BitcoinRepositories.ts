import CandleModel from "../models/CandleModel";
import { ICandleDocument } from "../models/interface/ICandle";
import { BaseRepository } from "./BaseRepository";

export class BitcoinRepository extends BaseRepository<ICandleDocument>{
    constructor() {
        super(CandleModel);
    }
    async findLastCandles(quantity: number): Promise<ICandleDocument[]> {
        const n = quantity > 0 ? quantity : 10
        const lastCandles: ICandleDocument[] = await this.find({}, n, undefined, undefined, { _id: -1 });
        return lastCandles
    }
}