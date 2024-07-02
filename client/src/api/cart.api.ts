import { httpclient } from "./https"

interface CartProps {
  product_id: number
  quantity: number
}

export const addCart = async (data: CartProps) => {
  const response = await httpclient.post("/cart", data)
  return response
}
