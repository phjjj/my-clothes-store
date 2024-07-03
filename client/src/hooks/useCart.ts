import { useMutation, useQuery } from "react-query"
import { fetchCart, removeCartItem } from "../api/cart.api"
import { useAlert } from "./useAlert"

export const useCart = () => {
  const { showAlert } = useAlert()
  // 장바구니 가져오기
  const { data: carts, isLoading, error } = useQuery("cart", fetchCart)

  // 장바구니 아이템 삭제
  const { mutate: deleteCartItem } = useMutation(removeCartItem, {
    onSuccess: () => {
      showAlert("장바구니에서 상품을 삭제했습니다.")
    },
    onError: () => {
      showAlert("상품 삭제에 실패했습니다.")
    },
  })

  return { carts: carts ? carts : [], isLoading, error, deleteCartItem }
}
