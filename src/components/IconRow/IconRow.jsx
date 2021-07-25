import Icon from '@mdi/react'

import { Anchor } from '../Anchor'

import * as Styled from './IconRow.styled'

export function IconRow({ href = null, icon, text }) {
  return (
    <Styled.Row>
      <Styled.IconWrapper>
        <Icon color="white" path={icon} size="20px" />
      </Styled.IconWrapper>
      {href ? <Anchor href={href}>{text}</Anchor> : text}
    </Styled.Row>
  )
}
