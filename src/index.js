import React from 'react';
import ReactDOM from 'react-dom/client';
import MyComponent from './Pages/my';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <MyComponent /> {/* MyComponent를 렌더링합니다. */}
</React.StrictMode>
);