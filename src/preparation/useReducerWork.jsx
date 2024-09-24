import { createContext, useContext, useReducer, useState } from "react";

const initialTasks = [
    { id: 0, text: 'To update knowledges of useReducer()', done: false },
    { id: 1, text: 'To update knowledges of useContext()', done: false },
    { id: 2, text: 'To update knowledges of useRef()', done: false },
    { id: 3, text: 'To update knowledges of useEffect()', done: false },
];

let nextId = initialTasks.length;

const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'added': {
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    done: action.done
                }
            ]
        }
        case 'deleted': {
            return state.filter(task => task.id !== action.id);
        }
        case 'edited': {
            return state.map(task => {
                if (task.id === action.task.id) {
                    return action.task;
                } else {
                    return task
                }
            })
        }
        default: {
            throw new Error('Unknown action!')
        }
    }
};

const AddNewTaskContainer = () => {
    const [text, setText] = useState('');
    const dispatch = useContext(TasksDispatch);

    const handleClickAddNewTask = () => {
        dispatch({type: 'added', id: nextId++, text: text, done: false});
        setText('');
    };

    const handleChangeText = (e) => {
        setText(e.target.value)
    };

    return (
        <div>
            <input
                placeholder="enter new task"
                onChange={handleChangeText}
                value={text}
            />
            <button
                onClick={handleClickAddNewTask}
            >Add new task</button>
        </div>
    );
}

const Task = ({ task }) => {
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useContext(TasksDispatch);

    const handleChangeTaskStatus = (e) => {
        dispatch({
            type: 'edited', task: {
                ...task,
                done: e.target.checked
            }
        })
    };

    const handleClickDelete = () => {
        dispatch({ type: 'deleted', id: task.id });
    }

    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    value={task.text}
                    onChange={(e) => dispatch({
                        type: 'edited',
                        task: {
                            ...task,
                            text: e.target.value
                        }
                    })}
                />
                <button onClick={() => setIsEditing(false)}>Edit</button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
        );
    }

    return (
        <label>
            <input
                type="checkbox"
                value={task.done}
                onChange={handleChangeTaskStatus}
            />
            {taskContent}
            <button onClick={handleClickDelete}>Delete</button>
        </label>
    )
}



const TasksContext = createContext(null);
const TasksDispatch = createContext(null);

const TasksList = () => {
    const tasks = useContext(TasksContext);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {
                tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                    />
                ))
            }
        </div>
    );
}

const ToDoList = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <>
            <TasksContext.Provider value={tasks}>
                <TasksDispatch.Provider value={dispatch}>
                    <h5>Add new task: </h5>
                    <AddNewTaskContainer />
                    <h5>You have to do: </h5>
                    <TasksList />
                </TasksDispatch.Provider>
            </TasksContext.Provider>

        </>
    );
}

export { ToDoList };