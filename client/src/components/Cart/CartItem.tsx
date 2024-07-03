import styled from "styled-components"
import { formatNumber } from "../../utils/format"
import { ICartItem } from "../../models/cart"
import Button from "../common/Button"
import { useMemo } from "react"
import CheckIconButton from "./CheckIconButton"

interface CartItemProps {
  cart: ICartItem
  checkedItems: number[]
  onDelete: (id: number) => void
  onCheck: (id: number) => void
}

function CartItem({ cart, checkedItems, onCheck, onDelete }: CartItemProps) {
  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.id)
  }, [checkedItems, cart.id])

  const handleCheck = () => {
    onCheck(cart.id)
  }

  const handleClickDelete = () => {
    onDelete(cart.id)
  }
  return (
    <CartItemStyle>
      <tr>
        <td className="checkbox">
          <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        </td>
        <td className="info">
          <div className="img">
            <img src={cart.product_image} alt="product" />
          </div>
          <div className="name">
            <p>{cart.title}</p>
          </div>
        </td>
        <td className="quantity">
          <p>{cart.quantity}</p>
        </td>
        <td className="price">
          <p>{formatNumber(cart.price)}원</p>
        </td>
        <td className="remove">
          <Button schema="primary" size="medium" onClick={handleClickDelete}>
            삭제
          </Button>
        </td>
      </tr>
    </CartItemStyle>
  )
}
const CartItemStyle = styled.tbody`
  .checkbox {
    width: 0px;
  }
  .name {
    p {
      font-size: 1.2rem;
    }
  }

  .img {
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`

export default CartItem
