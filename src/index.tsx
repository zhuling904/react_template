/* eslint-disable jsx-quotes */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

const root = document.querySelector('#root');
ReactDOM.createRoot(root as Element).render(<App name="vortesnail" age={25} />);
