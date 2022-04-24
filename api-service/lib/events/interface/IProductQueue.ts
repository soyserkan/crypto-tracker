import { ICombinationQueue } from "./ICombinationQueue"

export interface IProductQueue {
    sku: string,
    barcode: string,
    title: string,
    listPrice: number,
    salePrice: number,
    vatRate: number,
    brandId: number,
    categoryId: number,
    currency: string,
    quantity: number,
    description: string,
    images: ImageQueue[],
    combinations: ICombinationQueue[]
}
export interface ImageQueue {
    url: string
}