import { BaseModel } from './BaseModel';
import { ICandleDocument } from './interface/ICandle';

const CandleModel = new BaseModel<ICandleDocument>('Candle', {
    currency: { type: String, required: true },
    finalDateTime: { type: Date, required: true },
    open: { type: Number, required: true },
    close: { type: Number, required: true },
    high: { type: Number, required: true },
    low: { type: Number, required: true },
    color: { type: String, required: true }
}).build();

export default CandleModel;