import {z} from 'zod'

export const OrderSchema = z.object({
    productName:z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive()
})

export const createUserSchema = z.object({
    body: z.object({
        userId:z.number(),
        username: z.string(),
        password: z.string().min(6),
        fullName: z.object({
            firstName:z.string(),
            lastName: z.string()
        }),
        age: z.number().min(0),
        email: z.string().email(),
        isActive: z.boolean().optional(),
        hobbies:z.array(z.string()).optional(),
        address: z.object({
            street: z.string(),
            city: z.string(),
            country: z.string()
        }),
        orders:z.array(OrderSchema).optional()
    })
})


export const addOrderSchema = z.object({
    body: OrderSchema
})