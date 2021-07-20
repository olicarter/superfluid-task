import * as Styled from './Anchor.styled'

export function Anchor({ children, href, target = '_blank' }) {
  return (
    <Styled.Anchor href={href} target={target}>
      {children}
    </Styled.Anchor>
  )
}
