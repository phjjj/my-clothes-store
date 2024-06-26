import styled from "styled-components";
import Header from "../common/Header";
import Footer from "../common/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <LayoutStyle>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyle>
  );
}
const LayoutStyle = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export default Layout;
