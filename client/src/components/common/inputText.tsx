import React, { ForwardedRef } from "react"
import styled from "styled-components"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  inputType?: "text" | "email" | "password" | "number"
}
// forwardRef를 사용하여 ref를 전달합니다.
const InputText = React.forwardRef(
  ({ placeholder, inputType, onChange, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <InputTextStyled
        ref={ref}
        placeholder={placeholder}
        type={inputType}
        {...props}
        onChange={onChange}
      />
    )
  }
)

const InputTextStyled = styled.input`
  padding: 0.25rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.25rem;
`
export default InputText
