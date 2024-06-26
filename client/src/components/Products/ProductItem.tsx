import styled from "styled-components"
import { Product } from "../../models/product.model"
import { formatNumber } from "../../utils/format"

interface ProductItemProps {
  product: Product
}
function ProductItem({ product }: ProductItemProps) {
  return (
    <ProductItemStyle>
      <div className="img">
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className="contents">
        <h2 className="title">{product.title}</h2>
        <span className="price">{formatNumber(product.price)}원</span>
      </div>
    </ProductItemStyle>
  )
}
const ProductItemStyle = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  }

  .img {
    img {
      border-radius: 12px 12px 0px 0px;
      width: 100%;
    }
  }
  .contents {
    display: flex;
    flex-direction: column;
    padding: 20px;
    text-align: center;
    background-color: #f9f9f9;

    .title {
      font-size: 1.5rem;
      color: #333;
      margin: 0;
    }
  }
`

export default ProductItem
