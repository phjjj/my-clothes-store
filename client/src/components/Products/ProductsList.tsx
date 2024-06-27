import styled from "styled-components"
import { Product } from "../../models/product.model"
import ProductItem from "./ProductItem"

interface ProductsListProps {
  products: Product[]
}

function ProductsList({ products }: ProductsListProps) {
  return (
    <ProductsListStyle>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ProductsListStyle>
  )
}
const ProductsListStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`

export default ProductsList
