
export interface FullNameInterface{
    firstName: string,
    lastName: string
}
export interface AddressInterface {
    street: string,
    city: string,
    country: string
}
export interface OrderInterface {
    productName: string,
    price: number,
    quantity: number
}

export type UserInterface = {
    userId: number,
    username: string,
    password: string,
    fullName: FullNameInterface,
    age: number,
    email: string,
    isActive: boolean,
    hobbies: string[],
    address: AddressInterface,
    orders: OrderInterface[]
    
}