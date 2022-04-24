import { Router } from 'express';
import { BitcoinController } from '../controllers/BitcoinController';

class BitcoinRouter {
    router: Router;
    private bitcoinController: BitcoinController;
    constructor() {
        this.router = Router();
        this.bitcoinController = new BitcoinController();
        this.routes();
    }
    public routes() {
        this.router.get('/:quantity', this.bitcoinController.findLastCandles.bind(this.bitcoinController));
    }
}

const bitcoinRoutes = new BitcoinRouter();
export default bitcoinRoutes.router;