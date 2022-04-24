import { NextFunction, Request, Response } from 'express';
import { BitcoinService } from '../services/BitcoinService';

export class BitcoinController {

    private bitcoinService: BitcoinService;

    constructor() {
        this.bitcoinService = new BitcoinService();
    }
    async findLastCandles(req: Request, res: Response, next: NextFunction) {
        try {
            const quantity = parseInt(req.params.quantity);
            var lastCandles = await this.bitcoinService.findLastCandles(quantity);
            res.status(200).json(lastCandles);
        } catch (error) {
            next(error);
        }
    }
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            const newCandle = await this.bitcoinService.create(req.body);
            res.status(201).json({ status: true, result: newCandle });
        } catch (error) {
            next(error);
        }
    }
}