import { lazy, Suspense } from 'react'

import { Background } from './components'

import * as Styled from './App.styled'

const SummaryCard = lazy(() => import('./components/SummaryCard'))

export function App() {
  return (
    <>
      <Styled.Global />

      <Background />

      <Styled.Centered>
        <Suspense fallback={<div>loading...</div>}>
          <SummaryCard />
        </Suspense>
      </Styled.Centered>
    </>
  )
}
