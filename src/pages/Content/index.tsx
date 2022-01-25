import React, { FunctionComponent } from 'react'
import { render } from 'react-dom'
import root from 'react-shadow'

import WarningPanel from './modules/hud/warningPanel'
import styles from './index.css'
import warningHandlers from './modules/warnings'

const App: FunctionComponent = () => {
  return (
    <root.div className="benign-ext__shadow-root">
      <WarningPanel handlers={warningHandlers()} />
      <style type="text/css">{styles}</style>
    </root.div>
  )
}

const panel = document.createElement('div')
panel.id = 'benign-extension__hud-container'
document.body.appendChild(panel)

const target = window.document.querySelector(`#${panel.id}`)

render(<App />, target)
