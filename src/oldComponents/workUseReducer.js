import { useReducer, useState } from "react";

const initialTasks = [
    {id: 0, text: 'To update knowledges of useReducer()', done: false },
    {id: 1, text: 'To update knowledges of useContext()', done: false },
    {id: 2, text: 'To update knowledges of useRef()', done: false },
    {id: 3, text: 'To update knowledges of useEffect()', done: false },
];

let nextId = initialTasks.length;



export default function ToDoList() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleOnClickAdd(text) {
        dispatch({
            type: "added",
            id: nextId++,
            text: text
        })
    }

    function handleOnClickEdit(task) {
        dispatch({
            type: "edited",
            task: task
        })
    }

    function handleOnClickDelete(taskId) {
        dispatch({
            type: "deleted",
            id: taskId,
        })
    }

    return (
        <div className="tasks-container">
            <h1 className="tasks-haeder">
                Tasks you need to do
            </h1>
            <AddTask handleOnCLick={handleOnClickAdd} />
            <TaskList 
                tasks={tasks}
                handleOnCLickEdit={handleOnClickEdit}
                handleOnClickDelete={handleOnClickDelete} 
            /> 
        </div>
    );
}

function TaskList({tasks, handleOnCLickEdit, handleOnClickDelete}){
    return (
        <ul className="ul-of-tasks" style={{
            display: "flex",
            flexDirection: 'column'

        }}>
            {
                tasks.map(task => (
                    <Task 
                        key={task.id}
                        task={task}
                        handleOnCLickDelete={handleOnClickDelete}
                        handleOnCLickEdit={handleOnCLickEdit}
                    />
                ))
            }
        </ul>
    )
}

function Task({task, handleOnCLickEdit, handleOnCLickDelete}) {
    const [isEditing, setIsEditing] = useState(false);
    let taskContent;
    if(isEditing){
        taskContent = (
            <>
                <input 
                    value={task.text} 
                    onChange={(e) => handleOnCLickEdit({
                        ...task,
                        text: e.target.value
                })}
                />
                <button onClick={() => setIsEditing(false)}>Edit task</button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>Edit task</button>
            </>
        );
    }

    return (
        <label>
            <input 
                type="checkbox"
                checked={task.done}
                onChange={(e) => {
                    handleOnCLickEdit({
                        ...task, 
                        done: e.target.checked
                    })
                }}
            />
            {taskContent}
            <button onClick={() => handleOnCLickDelete(task.id)}>Delete task</button>
        </label>
    );
}

function AddTask({handleOnCLick}) {
    const [text, setText] = useState();
    return (
        <div className="add-task-container">
            <input placeholder="Enter new task" onChange={(e) => setText(e.target.value)} />
            <button 
                onClick={() => {
                    setText('');
                    handleOnCLick(text);
            }}
            >
                Add new Task
            </button>
        </div>
    )
}


function tasksReducer(tasks, action) {
    switch(action.type) {
        case "added": {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ]
        }
        case "edited": {
            return tasks.map(task => {
                if(task.id === action.task.id){
                    return action.task
                } else{
                    return task;
                }
            })
        }
        case "deleted": {
            return tasks.filter(task => task.id !== action.id)
        }
        default: {
            throw new Error('Unknown operation');
        }
    }
}