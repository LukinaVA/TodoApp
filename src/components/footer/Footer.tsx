import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {StatusFilters, colorFilterChanged} from '../filters/filtersSlice';
import {availableColors, capitalize} from '../filters/colors';
import {stateType, todoItemType} from '../../store';

import './footer.scss';

const RemainingTodos: React.FC<{count: number}> = (props) => {
    const suffix = props.count === 1 ? '' : 's';

    return (
        <div className='footer__col'>
            <h5 className='footer__title'>Todos</h5>
            <strong className='footer__todos-num'>{props.count}</strong> item{suffix} left
        </div>
    )
}

type statusFilterProps = {
    status: string,
    onChange: (s: string) => void
}

const StatusFilter: React.FC<statusFilterProps> = ({status, onChange}) => {

    const renderedFilters = Object.keys(StatusFilters).map((key) => {
        const value: string = StatusFilters[key];
        const handleClick = () => onChange(value);
        const className: string = value === status ? 'footer__btn footer__btn_selected' : 'footer__btn';

        return (
            <li key={value}>
                <button className={className} onClick={handleClick}>
                    {key}
                </button>
            </li>
        )
    })

    return (
        <div className='footer__col'>
            <h5 className='footer__title'>Filter by Status</h5>
            <ul className='footer__filters'>{renderedFilters}</ul>
        </div>
    )
}

type colorFilterProps = {
    colors: string[],
    onChange: (color: string, changeType: string) => void
}

const ColorFilters: React.FC<colorFilterProps> = ({colors, onChange}) => {
    const renderedColors = availableColors.map((color) => {
        const checked: boolean = colors.includes(color);
        const handleChange = () => {
            const changeType: string = checked ? 'removed' : 'added';
            onChange(color, changeType);
        }

        return (
            <label key={color} className={checked ? 'footer__color footer__color_checked' : 'footer__color'}>
                <input
                    type='checkbox'
                    name={color}
                    checked={checked}
                    onChange={handleChange}
                />
                <span
                    style={{
                        backgroundColor: color,
                    }}
                > </span>
                {capitalize(color)}
            </label>
        );
    })

    return (
        <div className='footer__col'>
            <h5 className='footer__title'>Filter by Color</h5>
            <form className='footer__colors'>{renderedColors}</form>
        </div>
    )
}

const Footer: React.FC = () => {
    const todosRemaining: number = useSelector((state: stateType) => {
        const uncompletedTodos: todoItemType[] = state.todos.filter(todo => !todo.completed);
        return uncompletedTodos.length;
    })

    const {status, colors} = useSelector((state: stateType) => state.filters);
    const dispatch = useDispatch();

    const markAllCompleted = () => {
        dispatch({type: 'todos/allCompleted'});
    }

    const clearCompleted = () => {
        dispatch({type: 'todos/clearCompleted'});
    }

    const onStatusChange = (status: string) => {
        dispatch({type: 'filters/statusFilterChanged', payload: status});
    }

    const onColorChange = (color: string, changeType: string) => {
        dispatch(colorFilterChanged(color, changeType));
    };

    return (
        <footer className='footer'>
            <div className='footer__col'>
                <h5 className='footer__title'>Actions</h5>
                <button className='footer__btn' onClick={markAllCompleted}>Mark All Completed</button>
                <button className='footer__btn' onClick={clearCompleted}>Clear Completed</button>
            </div>

            <RemainingTodos count={todosRemaining} />
            <StatusFilter status={status} onChange={onStatusChange} />
            <ColorFilters colors={colors} onChange={onColorChange} />
        </footer>
    );
}

export default Footer;