import styled from 'styled-components'
import { transparentize } from 'polished'

export const Flow = styled.div({
  color: 'white',
  display: 'flex',
  fontWeight: 600,
  width: '100%',
  ':not(:first-of-type)': {
    marginTop: '1rem',
  },
})

export const Avatar = styled.img({
  border: `4px solid ${transparentize(0.1, 'white')}`,
  borderRadius: '30px',
  height: '60px',
  width: '60px',
})
