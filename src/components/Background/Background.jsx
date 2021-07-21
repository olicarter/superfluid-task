import * as Styled from './Background.styled'

export function Background() {
  return (
    <>
      <Styled.Background
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 4, ease: 'linear' }}
      />
      {[...Array(200).keys()].map((i, index) => (
        <Styled.Star
          key={i}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            delay: (6 / 200) * index,
            duration: 2,
          }}
        />
      ))}
    </>
  )
}
