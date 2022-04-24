import { OrderStatus } from "../../models/enums/OrderStatus"
import { IOrderLineQueue } from "./IOrderLineQueu"

export interface IOrderQueue {
    orderNumber: string,
    cargoTrackingNumber: string,
    cargoSenderNumber: string,
    totalPrice: number,
    orderDate: number,
    currencyCode: string,
    platform: string,
    status: OrderStatus,
    customer: IOrderCustomerQueue,
    shipmentAddress: IOrderShipmentAddressQueue,
    invoiceAddress: IOrderInvoiceAddressQueue,
    lines: IOrderLineQueue[]
}
export interface IOrderCustomerQueue {
    name: string,
    surname: string,
    fullName: string,
    email: string,
    identityNumber: string
}
export interface IOrderShipmentAddressQueue {
    name: string,
    surname: string,
    fullName: string,
    address: string,
    city: string,
    district: string,
    postalCode: string,
    phone: string
}
export interface IOrderInvoiceAddressQueue {
    name: string,
    surname: string,
    fullName: string,
    address: string,
    city: string,
    district: string,
    postalCode: string,
    phone: string,
    taxNumber: string,
    taxOffice: string
}