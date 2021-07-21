import styled from 'styled-components'

export const Heading = styled.h3({
  color: 'white',
  display: 'flex',
  fontSize: '0.9rem',
  fontWeight: 600,
  letterSpacing: 1.2,
  lineHeight: 1,
  margin: '0 0 0.5rem',
  padding: '0.5rem calc(0.5rem + 2px)',
  position: 'relative',
  textTransform: 'uppercase',
  userSelect: 'none',
  ':before': {
    borderLeft: '3px solid white',
    borderTop: '3px solid white',
    content: '""',
    height: '0.75rem',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '0.75rem',
  },
})
