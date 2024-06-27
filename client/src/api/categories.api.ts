import { httpclient } from "./https"

export const fetchCategories = async () => {
  const response = await httpclient.get("/categories")
  return response.data
}
