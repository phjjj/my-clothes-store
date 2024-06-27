import { Category } from "../models/category.model"
import { useQuery } from "react-query"
import { fetchCategories } from "../api/categories.api"

export const useCategory = () => {
  const { data, isSuccess } = useQuery(["categories"], fetchCategories, {
    cacheTime: Infinity, // 캐시 시간을 무한대로 설정
  })

  const categories: Category[] = isSuccess ? [{ id: null, name: "New" }, ...data] : []

  return { categories }
}
