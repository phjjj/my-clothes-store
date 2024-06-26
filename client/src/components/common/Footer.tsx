import styled from "styled-components"

function Footer() {
  return (
    <FooterStyle>
      <h1>Soo Closet 🍃</h1>
      <hr />
      <div className="copyright">
        <p>copyright(c), 2024, Soo Closet</p>
      </div>
    </FooterStyle>
  )
}
const FooterStyle = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.large};
  padding: 20px 0;
  justify-content: space-between;
  .logo {
    img {
      width: 140px;
    }
  }
  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`

export default Footer
