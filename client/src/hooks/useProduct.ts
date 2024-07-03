import { InfiniteData, useMutation, useQuery, useQueryClient } from "react-query"
import { FetchProductResponse, fetchProduct } from "../api/products.api"
import { useLocation } from "react-router-dom"
import { addCart } from "../api/cart.api"
import { useAlert } from "./useAlert"

interface CacheData {
  pages: InfiniteData<FetchProductResponse>["pages"]
}

export const useProduct = (id: string | undefined) => {
  const { showAlert } = useAlert()
  const location = useLocation()
  const queryClient = useQueryClient()

  const { data: product } = useQuery(["product", id], () => fetchProduct(Number(id)), {
    initialData: () => {
      const queryData = queryClient.getQueryData<CacheData>([
        "products",
        location.pathname.split("/")[2] === "all" ? "all" : location.pathname.split("/")[2], // 카테고리별로 분기처리
      ])
      const product = queryData?.pages
        .flatMap((page) => page.products)
        .find((product) => product.id === Number(id))
      return product
    },
    staleTime: 1000 * 60 * 5,
  })

  // 장바구니에 상품 추가 mutation 만들기
  const { mutate: addCartMutate } = useMutation(addCart, {
    onSuccess: () => {
      showAlert("장바구니에 상품이 추가되었습니다.")
    },
    onError: () => {
      showAlert("장바구니에 상품을 추가하는데 실패했습니다.")
    },
  })

  return { product, addCartMutate }
}
