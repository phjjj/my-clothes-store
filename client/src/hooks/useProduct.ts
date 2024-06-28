import { useQueryClient } from "react-query"
import { FetchProductResponse, fetchProduct } from "../api/products.api"
import { Product } from "../models/product.model"
import { useState, useEffect } from "react"

interface CacheData {
  pageParam: []
  pages: FetchProductResponse[]
}

export const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    // 캐시된 데이터 가져오기
    const cacheProduct = queryClient.getQueryData<CacheData>(["products", ""])
    if (cacheProduct) {
      // 캐시 데이터가 있을 경우, 평탄화 후 제품 찾기
      const formattedData = cacheProduct.pages.flatMap((page) => page.products)
      const foundProduct = formattedData.find((product) => product.id === Number(id))
      if (foundProduct) setProduct(foundProduct)
    } else {
      // 캐시 데이터가 없을 경우, 제품 fetch
      queryClient
        .fetchQuery(["product", id], () => fetchProduct(Number(id)))
        .then((data) => {
          if (data) setProduct(data)
        })
    }
  }, [id, queryClient])

  return { product }
}
