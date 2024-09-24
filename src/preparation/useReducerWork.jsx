import { useReducer, useState } from "react";

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

const AddNewTaskContainer = ({ addNewTask }) => {
    const [text, setText] = useState('');

    const handleClickAddNewTask = () => {
        addNewTask(text);
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

const Task = ({ task, deleteTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleChangeTaskStatus = (e) => {
        editTask({
            ...task,
            done: e.target.checked
        })
    };

    const handleClickDelete = () => {
        deleteTask(task.id)
    }

    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    value={task.text}
                    onChange={(e) => editTask({
                        ...task,
                        text: e.target.value
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

const ToDoList = () => {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    const handleAdd = (text) => {
        dispatch({ type: 'added', id: nextId++, text: text, done: false });
    };

    const handleDelete = (id) => {
        dispatch({ type: 'deleted', id })
    };

    const handleEdit = (task) => {
        dispatch({ type: 'edited', task })
    };

    return (
        <>
            <h5>Add new task: </h5>
            <AddNewTaskContainer addNewTask={handleAdd} />
            <h5>You have to do: </h5>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {
                    tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            editTask={handleEdit}
                            deleteTask={handleDelete}
                        />
                    ))
                }
            </div>
        </>
    );
}

export { ToDoList };