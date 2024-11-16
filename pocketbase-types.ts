/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Cart = "cart",
	CartItems = "cart_items",
	Invoices = "invoices",
	OrderItems = "order_items",
	Orders = "orders",
	ProductInventory = "product_inventory",
	ProductPrices = "product_prices",
	Products = "products",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type CartRecord = {
	user_id?: RecordIdString
}

export type CartItemsRecord = {
	cart_id?: RecordIdString
	product_id?: RecordIdString
	quantity: number
}

export type InvoicesRecord = {
	invoice_number?: number
	notes?: string
	order_id?: RecordIdString
	status?: number
	tax_amount?: number
	total_amount?: number
	user_id?: RecordIdString
}

export type OrderItemsRecord = {
	order_id?: RecordIdString
	product_id?: RecordIdString
	quantity: number
	unit_price: number
}

export type OrdersRecord = {
	expiration_date: IsoDateString
	status?: number
	total_amount?: number
	user_id?: RecordIdString
}

export type ProductInventoryRecord = {
	product_id?: RecordIdString
	stock?: number
}

export type ProductPricesRecord = {
	is_active: boolean
	price: number
	product_id?: RecordIdString
	start_date?: IsoDateString
}

export type ProductsRecord = {
	description: string
	img?: string
	name: string
	status?: boolean
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type CartResponse<Texpand = unknown> = Required<CartRecord> & BaseSystemFields<Texpand>
export type CartItemsResponse<Texpand = unknown> = Required<CartItemsRecord> & BaseSystemFields<Texpand>
export type InvoicesResponse<Texpand = unknown> = Required<InvoicesRecord> & BaseSystemFields<Texpand>
export type OrderItemsResponse<Texpand = unknown> = Required<OrderItemsRecord> & BaseSystemFields<Texpand>
export type OrdersResponse<Texpand = unknown> = Required<OrdersRecord> & BaseSystemFields<Texpand>
export type ProductInventoryResponse<Texpand = unknown> = Required<ProductInventoryRecord> & BaseSystemFields<Texpand>
export type ProductPricesResponse<Texpand = unknown> = Required<ProductPricesRecord> & BaseSystemFields<Texpand>
export type ProductsResponse<Texpand = unknown> = Required<ProductsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	cart: CartRecord
	cart_items: CartItemsRecord
	invoices: InvoicesRecord
	order_items: OrderItemsRecord
	orders: OrdersRecord
	product_inventory: ProductInventoryRecord
	product_prices: ProductPricesRecord
	products: ProductsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	cart: CartResponse
	cart_items: CartItemsResponse
	invoices: InvoicesResponse
	order_items: OrderItemsResponse
	orders: OrdersResponse
	product_inventory: ProductInventoryResponse
	product_prices: ProductPricesResponse
	products: ProductsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'cart'): RecordService<CartResponse>
	collection(idOrName: 'cart_items'): RecordService<CartItemsResponse>
	collection(idOrName: 'invoices'): RecordService<InvoicesResponse>
	collection(idOrName: 'order_items'): RecordService<OrderItemsResponse>
	collection(idOrName: 'orders'): RecordService<OrdersResponse>
	collection(idOrName: 'product_inventory'): RecordService<ProductInventoryResponse>
	collection(idOrName: 'product_prices'): RecordService<ProductPricesResponse>
	collection(idOrName: 'products'): RecordService<ProductsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
