import styled from "styled-components"
import { Product } from "../models/product.model"
import ProductsList from "../components/Products/ProductsList"

const products: Product[] = [
  {
    id: 11,
    title: "Nike",
    category_id: 1,
    summary: "나이키 바람막이 제품입니다.",
    description: "나이키",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120187185_1000.jpg",
    ],
  },
  {
    id: 12,
    title: "Adidas",
    category_id: 1,
    summary: "Adidas",
    description: "Adidas",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719121131696_1000.jpg",
    ],
  },
  {
    id: 15,
    title: "Pants",
    category_id: 1,
    summary: "Pants",
    description: "Pants",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120868401_1000.jpg",
    ],
  },
  {
    id: 17,
    title: "\b",
    category_id: 2,
    summary: "하",
    description: "호",
    price: 123123,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120868401_1000.jpg",
    ],
  },
  {
    id: 11,
    title: "Nike",
    category_id: 1,
    summary: "나이키 바람막이 제품입니다.",
    description: "나이키",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120187185_1000.jpg",
    ],
  },
  {
    id: 12,
    title: "Adidas",
    category_id: 1,
    summary: "Adidas",
    description: "Adidas",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719121131696_1000.jpg",
    ],
  },
  {
    id: 15,
    title: "Pants",
    category_id: 1,
    summary: "Pants",
    description: "Pants",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120868401_1000.jpg",
    ],
  },
  {
    id: 17,
    title: "\b",
    category_id: 2,
    summary: "하",
    description: "호",
    price: 123123,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120868401_1000.jpg",
    ],
  },
  {
    id: 11,
    title: "Nike",
    category_id: 1,
    summary: "나이키 바람막이 제품입니다.",
    description: "나이키",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120187185_1000.jpg",
    ],
  },
  {
    id: 12,
    title: "Adidas",
    category_id: 1,
    summary: "Adidas",
    description: "Adidas",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719121131696_1000.jpg",
    ],
  },
  {
    id: 15,
    title: "Pants",
    category_id: 1,
    summary: "Pants",
    description: "Pants",
    price: 20000,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120868401_1000.jpg",
    ],
  },
  {
    id: 17,
    title: "\b",
    category_id: 2,
    summary: "하",
    description: "호",
    price: 123123,
    images: [
      "https://contents.sixshop.com/thumbnails/uploadedFiles/194067/product/image_1719120868401_1000.jpg",
    ],
  },
]

function Home() {
  return (
    <HomeStyle>
      <h1>NEW ARRIVALS</h1>
      <ProductsList products={products} />
    </HomeStyle>
  )
}
const HomeStyle = styled.div`
  h1 {
    color: ${(props) => props.theme.colors.primary};
    text-align: center;
    font-size: 2rem;
    margin-top: 2rem;
  }
  max-width: 1200px;
  margin: 0 auto;
`

export default Home
