import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import './App.css'
import { BsCircleFill, BsFillCheckCircleFill } from 'react-icons/bs'
import { BsFillTrashFill } from 'react-icons/bs'

function Home() {
  const [todos,setTodos]=useState([])
  useEffect(() => {
    axios.get('http://127.0.0.1:3001/get')
    .then(result=>setTodos(result.data))
    .catch(error=>console.log(error))
  },[])

  const handleEdit = (id) => {
    axios.put('http://127.0.0.1:3001/update/' + id)
    .then(result=>{
      location.reload()
    })
    .catch(error=>console.log(error))
  }
  const handleDelete = (id) => {
    axios.delete('http://127.0.0.1:3001/delete/' + id)
    .then(result=>{
      location.reload()
    })
    .catch(error=>console.log(error))
  }
  return (
            <div className="home">
          <h2 className="home__heading">ToDo List</h2>
          <Create />
          {
            todos.length === 0
              ? <div className="no-records"><h2>No Records</h2></div>
              : todos.map(todo => (
                  <div className="task" key={todo._id}>
                    <div className="task__checkbox" onClick={() => handleEdit(todo._id)}>
                      {todo.done
                        ? <BsFillCheckCircleFill className="task__icon" />
                        : <BsCircleFill className="task__icon" />
                      }
                      <p className={`task__text ${todo.done ? "task__text--completed" : ""}`}>
                        {todo.task}
                      </p>
                    </div>
                    <div>
                      <span>
                        <BsFillTrashFill
                          className="task__delete-icon task__icon"
                          onClick={() => handleDelete(todo._id)}
                        />
                      </span>
                    </div>
                  </div>
                ))
          }
        </div>

          )
        }


export default Home
