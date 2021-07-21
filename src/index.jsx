import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import reportWebVitals from './reportWebVitals'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-rinkeby',
  cache: new InMemoryCache(),
})

const theme = {
  palette: { white: 'hsl(40, 100%, 95%)' },
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
