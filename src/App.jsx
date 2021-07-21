import { lazy, Suspense } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

import { Background } from './components'

import * as Styled from './App.styled'

const Button = lazy(() => import('./components/Button'))
const SummaryCard = lazy(() => import('./components/SummaryCard'))

export function App() {
  const { push } = useHistory()

  async function connect() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    if (accounts.length) push('/dashboard')
  }

  return (
    <>
      <Styled.Global />

      <Background />

      <Styled.Centered>
        <Suspense
          fallback={
            <Icon
              color="hsla(0, 0%, 0%, 0.15)"
              path={mdiLoading}
              size="50px"
              spin={1}
            />
          }
        >
          <Switch>
            <Route exact path="/">
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <Button onClick={connect}>Continue with MetaMask</Button>
              </motion.div>
            </Route>

            <Route exact path="/dashboard">
              <SummaryCard />
            </Route>
          </Switch>
        </Suspense>
      </Styled.Centered>
    </>
  )
}
