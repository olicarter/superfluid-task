import styled from 'styled-components'

export const Button = styled.button(() => ({
  appearance: 'none',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'hsla(0, 0%, 0%, 0.15)',
  border: 'none',
  borderRadius: '1000px',
  boxShadow: '0 0 2rem 1rem hsla(0, 0%, 0%, 0.05)',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1.3rem',
  fontWeight: 600,
  outline: 'none',
  padding: '1rem 2rem',
  transitionDuration: '200ms',
  ':hover': {
    backgroundColor: 'hsla(0, 0%, 0%, 0.2)',
    boxShadow: '0 0 2rem 1rem hsla(0, 0%, 0%, 0.075)',
  },
  ':active': {
    backgroundColor: 'hsla(0, 0%, 0%, 0.25)',
    boxShadow: '0 0 2rem 1rem hsla(0, 0%, 0%, 0.1)',
  },
}))
