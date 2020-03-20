import React, { useState, useEffect } from 'react';
import './App.css';
import { firestore } from './index'

const App = () => {


  const [tasks, setTasks] = useState([
    { id: 1, name: "do  homework" },
    { id: 2, name: "write node js" }
  ]);

  const [name, setname] = useState();


  useEffect(() => {
    resiveData()


  }, [])

  const resiveData = () => {
    firestore.collection('tasks').onSnapshot((snapshot) => {
      console.log(snapshot.docs)
      let mytask = snapshot.docs.map(d => {
        const { id, name } = d.data()
        console.log(id, name)
        return { id, name }
      })
      setTasks(mytask)

    })

  }

  const renderTask = () => {
    if (tasks && tasks.length)
      return (
        tasks.map((task, index) => {
          return (
            <li ket={index}>
              {task.id} : {task.name}
            </li>
          )
        })
      )
    else {
      return (
        <p>NO Tasks</p>
      )
    }
  }

  const addTask = () => {
    let id = tasks[tasks.length-1].id+1
    firestore.collection('tasks').doc(id+'').set({id,name});
  }

  return (
    <div>
      <h1>Todo</h1>
      <input type="text" name='name' onChange={e => setname(e.target.value)} />
      <button onClick={addTask}>Submit</button>
      <a>{renderTask()}</a>
      


    </div>
  );
}

export default App;
