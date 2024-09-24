import { toDoAppWithCombineReducers } from "./reducers";
import { createStore } from "redux";

import { 
    addToDo,
    toggleToDo,
    setVisibilityFilter,
    VisibilityFilters 
} from "./actions";

export const store = createStore(toDoAppWithCombineReducers);


console.log(store.getState());

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(addToDo('first item'));
store.dispatch(addToDo('second item'));
store.dispatch(addToDo('third item'));
store.dispatch(addToDo('fourth item'));

store.dispatch(toggleToDo(2));
store.dispatch(toggleToDo(1));

store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

unsubscribe();
