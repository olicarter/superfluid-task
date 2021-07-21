import styled from 'styled-components'

export const Avatar = styled.img(({ loaded }) => ({
  alignItems: 'center',
  border: '4px solid white',
  borderRadius: '100px',
  color: 'white',
  display: 'flex',
  height: '200px',
  justifyContent: 'center',
  objectFit: 'cover',
  opacity: loaded ? 1 : 0,
  transitionDuration: '100ms',
  userSelect: 'none',
  width: '200px',
}))
