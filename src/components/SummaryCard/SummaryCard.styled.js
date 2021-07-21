import styled from 'styled-components'
import { motion } from 'framer-motion'

export const Card = styled(motion.div)({
  alignItems: 'center',
  backdropFilter: 'blur(20px)',
  backgroundColor: 'hsla(0, 0%, 0%, 0.15)',
  borderRadius: '1rem',
  boxShadow: '0 0 2rem 1rem hsla(0, 0%, 0%, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '480px',
  overflow: 'hidden',
  padding: '2rem',
  width: '100%',
})

export const Row = styled.div({
  marginTop: '2rem',
  width: '100%',
})
