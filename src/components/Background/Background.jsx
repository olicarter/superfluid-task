import * as Styled from './Background.styled'

export function Background() {
  return (
    <Styled.Background>
      {/* {[...Array(50).keys()].map((i, index) => (
        <Styled.Star
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            delay: (6 / 50) * index,
            duration: 3,
          }}
        />
      ))} */}
    </Styled.Background>
  )
}
