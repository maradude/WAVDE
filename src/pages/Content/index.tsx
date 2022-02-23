import React, { useRef } from 'react'
import { render } from 'react-dom'
import root from 'react-shadow/emotion'

import WarningPanel from './modules/hud/warningPanel'

const App = () => {
  const rootRef = useRef(null)
  return (
    <root.div className="benign-ext__shadow-root">
      <div ref={rootRef}>
        <WarningPanel rootRef={rootRef} />
      </div>
    </root.div>
  )
}

const panel = document.createElement('div')
panel.id = 'benign-extension__hud-container'
document.body.appendChild(panel)

const target = window.document.querySelector(`#${panel.id}`)

render(<App />, target)
