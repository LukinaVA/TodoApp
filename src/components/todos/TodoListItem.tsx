import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {availableColors, capitalize} from '../filters/colors';
import {stateType, todoItemType} from '../../store';

const selectTodoById = (state: stateType, todoId: number) => {
    return state.todos.find(todo => todo.id === todoId);
}

interface ITodoListItem {
    id: number
}

const TodoListItem: React.FC<ITodoListItem> = ({id}) => {
    // @ts-ignore
    const todo: todoItemType = useSelector((state: stateType) => selectTodoById(state, id));
    const {text, completed, color} = todo;

    const dispatch = useDispatch();

    const handleCompleteChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: 'todos/todoToggled', payload: todo.id});
        let label = e.target.parentElement;
        if (label !== null) {
            label.classList.toggle('todo__content_checked');
        }
    }

    const handleColorChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const color = e.target.value;
        dispatch({type: 'todos/todoColorChanged', payload: {todoId: todo.id, color: color}});
    }

    const handleDeleteBtn = () => {
        dispatch({type: 'todos/todoDeleted', payload: todo.id});
    }

    const colorOptions = availableColors.map((c: string) => (
        <option key={c} value={c}>
            {capitalize(c)}
        </option>
    ))

    return (
        <li>
            <div className='todo'>
                <div className='todo__part'>
                    <label className={completed ? 'todo__content todo__content_checked' : 'todo__content'}>
                        <input
                            className='todo__checkbox'
                            type='checkbox'
                            checked={completed}
                            onChange={handleCompleteChanged}
                        />
                        <span>{text}</span>
                    </label>
                </div>
                <div className='todo__part'>
                    <select
                        className='todo__color color-picker'
                        value={color}
                        style={{ color }}
                        onChange={handleColorChanged}
                    >
                        <option value=''> </option>
                        {colorOptions}
                    </select>
                    <span className='todo__deleteBtn' onClick={handleDeleteBtn}> </span>
                </div>
            </div>
        </li>
    );
}

export default TodoListItem