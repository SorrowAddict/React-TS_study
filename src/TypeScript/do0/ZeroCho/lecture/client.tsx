import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import GuGuDan from './GuGuDan'

const rootElement = document.querySelector('#root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)

root.render(<GuGuDan />)
