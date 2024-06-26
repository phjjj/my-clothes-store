import styled from "styled-components";
import { ButtonSchema, ButtonSize } from "../../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  schema: ButtonSchema;
}

function Button({ children, size, schema, ...props }: Props) {
  return (
    <ButtonStyle {...props} size={size} schema={schema}>
      {children}
    </ButtonStyle>
  );
}
const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, schema }) => theme.buttonSchema[schema].color};
  background-color: ${({ theme, schema }) =>
    theme.buttonSchema[schema].backgroundColor};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    opacity: 0.8;
  }
`;

export default Button;
