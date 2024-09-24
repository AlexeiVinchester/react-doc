export const ADD_TO_DO = 'ADD_TO_DO';
export const TOGGLE_TO_DO = 'TOGGLE_TO_DO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const SHOW_COMPLETED = 'SHOW_COMPLETED';

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// created actions

export const addToDo = (text) => {
    return {
        type: ADD_TO_DO,
        text: text
    }
};

export const toggleToDo = (index) => {
    return {
        type: TOGGLE_TO_DO,
        index: index
    }
}

export const setVisibilityFilter = (filter) => {
    return {
        type: SET_VISIBILITY_FILTER,
        filter: filter
    }
}

