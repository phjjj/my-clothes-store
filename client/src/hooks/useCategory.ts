import { Category } from "../models/category.model"
import { useQuery } from "react-query"
import { fetchCategories } from "../api/categories.api"

export const useCategory = () => {
  const { data, isSuccess } = useQuery(["categories"], fetchCategories, {
    staleTime: Infinity,
  })

  const categories: Category[] = isSuccess ? [{ id: null, name: "New" }, ...data] : []

  return { categories }
}
