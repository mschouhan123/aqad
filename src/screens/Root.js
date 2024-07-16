// Root.js
import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { AuthProvider } from '../Context/AuthContext';
import App from '../../App';

const Root = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </AuthProvider>
  );
};

export default Root;
