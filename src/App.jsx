import './App.css'
import './index.css'

import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/saga-blue/theme.css'
import { MailReader } from './components/MailReader'

function App() {
  return (
    <div className="App" data-testid="app">
      <MailReader />
    </div>
  )
}

export default App
