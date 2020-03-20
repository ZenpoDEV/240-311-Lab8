import React from 'react'

export default (props) => {
    const { task, editTask, deleteTask } = props
    const { id, name } = task
    return (
        <li >
            {id} : {name}
            <button onClick={() => deleteTask(task.id)}>delete</button>
            <button onClick={() => editTask(task.id)}>update</button>
        </li>
    )
}