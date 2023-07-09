import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import axios from 'axios';
import { SWRConfig } from 'swr';

//@ts-ignore
library.add(fas, far);

export const fetcher = (url: string) => axios.get(url).then(res => res.data)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: fetcher,
        onError: (err: string) => {
          console.error(err)
        }
      }}
    >
      
      <App />
    </SWRConfig>
  </React.StrictMode>,
)
