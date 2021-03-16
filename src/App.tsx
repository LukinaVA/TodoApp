import React from 'react';

import Header from './components/header/Header';
import TodoList from './components/todos/TodoList';
import Footer from './components/footer/Footer';

import './app.scss'

function App() {
    const changeTheme = () => {
        document.body.classList.toggle('light-theme');
    }

  return (
      <div className='container'>
          <div className='app'>
              <div className='dark-light' onClick={changeTheme}>
                  <svg viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                  </svg>
              </div>
              <section className='app__section'>
                  <h2 className='app__header'>Todos</h2>
                  <div className='app__body'>
                      <Header/>
                      <TodoList/>
                      <Footer/>
                  </div>
              </section>
          </div>
      </div>
  );
}

export default App