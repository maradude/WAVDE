import React from 'react'
import { render } from 'react-dom'

// import FailLog from './failLog'

import './index.css'

// <FailLog storage={jwtFails} />,
render(<div>Hello</div>, window.document.querySelector('#app-container'))

if (module.hot) module.hot.accept()
