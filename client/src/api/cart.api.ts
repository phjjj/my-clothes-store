import { ICartItem } from "../models/cart"
import { httpclient } from "./https"

interface CartProps {
  product_id: number
  quantity: number
}

export const addCart = async (data: CartProps) => {
  const response = await httpclient.post("/cart", data)
  return response
}

export const fetchCart = async () => {
  const response = await httpclient.get<ICartItem[]>("/cart")
  return response.data
}

export const removeCartItem = async (id: number) => {
  const response = await httpclient.delete(`/cart/${id}`)
  return response
}
