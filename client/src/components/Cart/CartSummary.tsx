import styled from "styled-components"
import { formatNumber } from "../../utils/format"

interface CartSummaryProps {
  totalQuantity: number
  totalPrice: number
}

function CartSummary({ totalQuantity, totalPrice }: CartSummaryProps) {
  return (
    <CartSummaryStyle>
      <dl>
        <dt>총 수량</dt>
        <dd>{totalQuantity}</dd>
      </dl>
      <dl>
        <dt>총 금액</dt>
        <dd>{formatNumber(totalPrice)}원</dd>
      </dl>
    </CartSummaryStyle>
  )
}
const CartSummaryStyle = styled.div`
  padding: 12px;
  width: 240px;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
  dl {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    dd {
      font-weight: 700;
    }
  }
`

export default CartSummary
