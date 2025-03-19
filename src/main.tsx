import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import UserProvider from 'contexts/UserContext.tsx';
import MyOdsProvider from 'contexts/MyOdsProvider.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <MyOdsProvider>
          <App />
        </MyOdsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
