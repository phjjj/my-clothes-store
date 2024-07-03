import styled from "styled-components"
import CartItem from "../components/Cart/CartItem"
import Button from "../components/common/Button"
import { useMemo, useState } from "react"
import { useCart } from "../hooks/useCart"
import CartSummary from "../components/Cart/CartSummary"

function Cart() {
  const { carts, isLoading, error, deleteCartItem } = useCart()
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const handleCheckItem = (id: number) => {
    // 이미 체크된 아이템이라면 체크 해제
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id))
    } else {
      setCheckedItems([...checkedItems, id])
    }
  }

  const totalQuantity = useMemo(() => {
    return carts?.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity
      }
      return acc
    }, 0)
  }, [carts, checkedItems])

  const totalPrice = useMemo(() => {
    return carts?.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price * cart.quantity
      }

      return acc
    }, 0)
  }, [carts, checkedItems])

  if (carts?.length === 0) {
    return <h1>장바구니에 담긴 상품이 없습니다.</h1>
  }

  return (
    <CartStyle>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <td>상품정보</td>
            <td>수량</td>
            <td>가격</td>
          </tr>
        </thead>
        {carts?.map((item) => (
          <CartItem
            key={item.id}
            cart={item}
            checkedItems={checkedItems}
            onCheck={handleCheckItem}
            onDelete={deleteCartItem}
          />
        ))}
      </table>

      <div className="summary">
        <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
        <Button size="large" schema="primary">
          주문하기
        </Button>
      </div>
    </CartStyle>
  )
}
const CartStyle = styled.div`
  padding: 2rem;
  margin: 0 auto;

  td {
    padding: 1rem;
  }
  table {
    width: 100%;

    tr {
      border-bottom: 1px solid #ddd;
    }
  }
  .summary {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`

export default Cart
