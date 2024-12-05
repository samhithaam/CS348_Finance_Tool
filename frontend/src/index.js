import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18
import App from './App'; // Adjust if necessary
import './index.css'; // If you have global styles

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);