import React from 'react'
import './Task.css'

export default (props) => {
    const { task, editTask, deleteTask } = props
    const { id, name } = task
    return (
        <li >
            <div class="id">
                {id}
            </div>
            <div className="name">
                {name}
            </div>
            <div class='container'>
            <button class='green' onClick={() => editTask(task.id)}>Update</button>
            <button class='red' onClick={() => deleteTask(task.id)}>Delete</button>
            </div>        
        </li>
    )
}