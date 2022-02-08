import React, { useRef, FunctionComponent } from 'react'
import { render } from 'react-dom'
import root from 'react-shadow/emotion'

import WarningPanel from './modules/hud/warningPanel'
import warningHandlers from './modules/warnings'

const App: FunctionComponent = () => {
  const rootRef = useRef(null)
  return (
    <root.div className="benign-ext__shadow-root">
      <div ref={rootRef}>
        <WarningPanel handlers={warningHandlers()} rootRef={rootRef} />
      </div>
    </root.div>
  )
}

const panel = document.createElement('div')
panel.id = 'benign-extension__hud-container'
document.body.appendChild(panel)

const target = window.document.querySelector(`#${panel.id}`)

render(<App />, target)
