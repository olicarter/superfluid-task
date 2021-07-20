import styled, { css, keyframes } from 'styled-components'
import { motion } from 'framer-motion'

const animation = keyframes({
  from: {
    filter: 'hue-rotate(0deg)',
  },
  to: {
    filter: 'hue-rotate(360deg)',
  },
})

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomHue = randomInteger(0, 360)

export const Background = styled.div(
  () => ({
    background: `linear-gradient(150deg, hsl(${randomHue}, 80%, 25%), hsl(${
      randomHue + 90
    }, 60%, 60%))`,
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

const randomPercentage = () => `${Math.random() * 100}%`

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
