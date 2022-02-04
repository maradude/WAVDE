import React from 'react'
import { render } from 'react-dom'

import './index.css'

render(<div>Hello</div>, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
