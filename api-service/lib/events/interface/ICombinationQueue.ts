export interface ICombinationQueue {
    barcode: string,
    quantity: number,
    sku: string,
    title: string,
    attributes: ProductAttributesQueue[]
}
export interface ProductAttributesQueue {
    name: String,
    value: String
}