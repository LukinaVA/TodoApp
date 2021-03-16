import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import './style.scss'
import App from './App';
import './fakeApi/server';
import store from './store';
import {fetchTodos} from './components/todos/todosSlice';

// @ts-ignore
store.dispatch(fetchTodos());

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);