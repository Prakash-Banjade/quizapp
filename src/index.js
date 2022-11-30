import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QuestionsContext from './components/context/QuizState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <QuestionsContext>
    <App />
  </QuestionsContext>
  </React.StrictMode>
);