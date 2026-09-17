import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './services/Storage/RootReducer';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = createStore(RootReducer);
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '448469104195-c8fm7fqudjr6tcv9dra4nhdq4b3eo1rd.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
