import {
    SET_VISIBILITY_FILTER,
    VisibilityFilters,
    ADD_TO_DO,
    TOGGLE_TO_DO,
} from "./actions";
import { combineReducers } from "redux";

const {SHOW_ALL} = VisibilityFilters;

const todo = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_DO: 
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ];
        case TOGGLE_TO_DO: 
            return state.map((todo, index) => {
                if(index === action.index) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            });
        default:
            return state;
    }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter; 
        default: 
            return state;
    }
}

export function todoApp(state, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todo(state.todos, action)
    }
}

export const toDoAppWithCombineReducers = combineReducers({visibilityFilter, todo});