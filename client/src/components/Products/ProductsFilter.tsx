import styled from "styled-components"
import { useCategory } from "../../hooks/useCategory"
import { useSearchParams } from "react-router-dom"
import { QUERYSTRING } from "../../constants/querystring"

function ProductsFilter() {
  const { categories } = useCategory()

  const [searchParams, setSearchParams] = useSearchParams()

  const handleClickCategory = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID)
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString())
    }

    setSearchParams(newSearchParams)
  }

  return (
    <ProductsFilterStyle>
      <ul className="category">
        {categories.map((category) => (
          <li onClick={() => handleClickCategory(category.id)} key={category.id}>
            {category.name}
          </li>
        ))}
      </ul>
    </ProductsFilterStyle>
  )
}
const ProductsFilterStyle = styled.div`
  .category {
    display: flex;
    gap: 20px;
    justify-content: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    padding: 10px 0 0 0;
    li {
      list-style: none;
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: none;
      font-size: ${({ theme }) => theme.heading.small.fontSize};
      font-weight: bold;
      cursor: pointer;
    }
  }
`

export default ProductsFilter
