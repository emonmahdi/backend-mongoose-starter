import { model, Schema } from 'mongoose'
import {
  AddressInterface,
  FullNameInterface,
  OrderInterface,
  UserInterface,
} from './user.interface'

const FullNameSchema = new Schema<FullNameInterface>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
  },
  { _id: false },
)

const addressSchema = new Schema<AddressInterface>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
)
const ordersSchema = new Schema<OrderInterface>(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
)

const userSchema = new Schema<UserInterface>(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    fullName: {
      type: FullNameSchema,
      required: true,
    },
    age: { type: Number, required: true, min: 0 },
    email: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, default: true },
    hobbies: {
      type: [String],
      default: [],
    },
    address: {
      type: addressSchema,
      required: true,
    },
    orders: { type: [ordersSchema], default: [] },
  },
  {
    timestamps: true,
  },
)

export const UserModel = model<UserInterface>('User', userSchema)
