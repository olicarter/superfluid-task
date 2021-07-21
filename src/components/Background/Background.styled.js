import styled, { css, keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const animation = keyframes({
  '0%': {
    filter: 'hue-rotate(0deg)',
  },
  '50%': {
    filter: 'hue-rotate(160deg)',
  },
  '100%': {
    filter: 'hue-rotate(0deg)',
  },
})

export const Background = styled(motion.div)(
  () => ({
    background:
      'linear-gradient(150deg, hsl(180, 80%, 25%), hsl(220, 60%, 60%))',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  }),
  css`
    animation: ${animation} 60s infinite linear;
  `,
)

const randomPercentage = () => `${Math.random() * 99}%`

export const Star = styled(motion.div)(
  ({
    theme: {
      palette: { white },
    },
  }) => ({
    backgroundColor: white,
    borderRadius: '50%',
    height: '1px',
    left: randomPercentage(),
    position: 'absolute',
    top: randomPercentage(),
    transform: `scale(${Math.random() * 4})`,
    width: '1px',
  }),
)
