import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./Css/components/button.css"
import "./Css/components/alerts.css"
import "./Css/components/loading.css"
import "./Css/components/google.css"
import "./pages/Auth/Auth.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import MenuContext from './Context/MenuContext';
import WindowContext from './Context/WindowContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <WindowContext >
      <MenuContext>
          <Router>
             <App />
          </Router>
      </MenuContext>
      </WindowContext>      
  </React.StrictMode>
);

