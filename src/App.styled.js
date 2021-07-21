import styled, { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle({
  '*': {
    boxSizing: 'border-box',
  },
  body: {
    fontFamily: 'sans-serif',
    margin: 0,
    padding: 0,
  },
})

export const Centered = styled.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  width: '100%',
})
