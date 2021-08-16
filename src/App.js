import './App.css'

import React from 'react'

import { MailReader } from './components/MailReader'

function App() {
  return (
    <div className="App" data-testid="app">
      <MailReader />
    </div>
  )
}

export default App
