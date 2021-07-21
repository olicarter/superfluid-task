import * as Styled from './Background.styled'

export function Background() {
  return (
    <>
      <Styled.Background
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 2, ease: 'easeIn' }}
      />
      {[...Array(10).keys()].map((i, index) => (
        <Styled.Star
          key={i}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            delay: (4 / 10) * index,
            duration: 3,
          }}
        />
      ))}
    </>
  )
}
