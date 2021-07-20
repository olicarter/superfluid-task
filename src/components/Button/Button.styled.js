import styled from 'styled-components'

export const Button = styled.button({
  appearance: 'none',
  backdropFilter: 'blur(8px)',
  backgroundColor: 'hsla(0, 0%, 100%, 0.05)',
  border: 'none',
  borderRadius: '500px',
  // color: 'white',
  cursor: 'pointer',
  fontFamily: 'sans-serif',
  fontSize: '1.2rem',
  fontWeight: 600,
  letterSpacing: 1.1,
  outline: 'none',
  padding: '1rem 2rem',
  transitionDuration: '300ms',
  ':hover': {
    backgroundColor: 'hsla(0, 0%, 100%, 0.15)',
  },
})
