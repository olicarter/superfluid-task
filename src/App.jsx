import { Background, SummaryCard } from './components'

import * as Styled from './App.styled'

export function App() {
  return (
    <>
      <Styled.Global />

      <Background />

      <Styled.Centered>
        <SummaryCard />
      </Styled.Centered>
    </>
  )
}
