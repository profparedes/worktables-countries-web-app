import { memo } from 'react'

import GlobalStyle from 'GlobalStyle'

import Routes from 'Routes'

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Routes />
  </>
)

export default memo(App)
