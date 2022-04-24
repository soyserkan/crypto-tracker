import { Document } from 'mongoose';


export interface ICandleDocument extends Document, ICandle {
    id: any
}

export interface ICandle {
    currency: string
    finalDateTime: Date
    open: number
    close: number
    high: number
    low: number
    color: string
}