import React, { useState, useEffect } from 'react';
import './App.css';
import { firestore } from './index'
import Task from './Task'
import './Task.css'

const App = () => {


  const [tasks, setTasks] = useState([]);

  const [name, setname] = useState(null);


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

  const deleteTask = (id) => {
    firestore.collection('tasks').doc(id + '').delete()
  }

  const editTask = (id) => {
    firestore.collection('tasks').doc(id + '').set({ id, name })
  }

  const renderTask = () => {
    if (tasks && tasks.length)
      return (
        tasks.map((task, index) => {
          return (
            <Task key={index} task={task}
              deleteTask={deleteTask} editTask={editTask} />
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
    if (name === '' || name === null) {
      alert('Input some you want todo !!! idiot !!! name is : ' + name)
    }
    else {
      let id = (tasks.length === 0) ? 1 : tasks[tasks.length - 1].id + 1
      firestore.collection('tasks').doc(id + '').set({ id, name });
    }
  }

  return (
    <div class='AppBG' style={{ display: 'flex', listStyle: 'none', justifyContent: 'center', flexWrap: 'nowrap' }}>
      <div class='App'>
        <h1> Do you want todo something ?</h1>

        <input style={{ width: '200px' }} type="text" name='name' onChange={e => setname(e.target.value)} />
        <button onClick={addTask}>Submit</button>
        <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'center', flexWrap: 'wrap' }}>{renderTask()}</ul>
      </div>
    
      <p> 
        create by Krittamet Petchkor 5935512001 section 02  
        </p>  
    </div>
  );
}

export default App;
