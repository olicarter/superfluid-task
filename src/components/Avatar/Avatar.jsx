import { useEffect, useState } from 'react'

import * as Styled from './Avatar.styled'

export function Avatar() {
  const [avatarSrc, setAvatarSrc] = useState('')
  const [loaded, setLoaded] = useState(false)

  function handleLoad() {
    setLoaded(true)
  }

  useEffect(() => {
    ;(async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user`)
      const { avatar } = await res.json()
      setAvatarSrc(avatar)
    })()
  }, [])

  return <Styled.Avatar loaded={loaded} onLoad={handleLoad} src={avatarSrc} />
}
