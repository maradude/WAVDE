import React from 'react';
import { render } from 'react-dom';
import FailLog from './failLog';

import './index.css';

render(
  <FailLog />, window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
