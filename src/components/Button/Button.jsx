import * as Styled from './Button.styled'

export function Button({ children, onClick }) {
  return <Styled.Button onClick={onClick}>{children}</Styled.Button>
}
