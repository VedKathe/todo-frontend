import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Task from '../components/Task'

const Home = () => {

    const [task, setTask] = useState([]); //default is empty table into db
    const [title, setTitle] = useState(''); //emty input default

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {

            const resultTask = await axios.get('/api/todos/'); 
            console.log(resultTask.data);
            setTask(resultTask.data);
        }
        fetchData();

    }, []);

    const addTaskHandler = async (e) => {
        e.preventDefault();

        try {

            const {data} = await axios.post('/api/todos/add', {
                title
            });
            console.log(data);
            const resultTask = await axios.get('/api/todos/'); 
            setTask(resultTask.data);
            
            navigate("/");

        } catch(error) {
            console.log(error.message);
            toast.error('Error adding new task123!');
        }

    }

  return (
    <div className='container'>
        <div className="row">
            <div className="to-do">
                <div className="to-do-header">
                    <h2 className="title">TO-DO</h2>
                    <form onSubmit={addTaskHandler}>
                        <input type="text" placeholder='Enter the Task' onChange={(e) => setTitle(e.target.value)} value={title} required/>
                        <button className='add'>Add</button>
                    </form>
                </div>
                <div className="to-do-body">
                    {
                        task.length === 0 ? (<h3 className='info'>You have not added any tasks!</h3>) : (
                            <>
                                {task?.map((item) => (
                                    <Task item={item} key={item._id} />
                                ))}
                            </>
                        )
                    }
                </div>
                {/** 
                <div className="to-do-footer">
                    <span>&copy; 2022. All Rights Reserved. Powered by Miljan Peric.</span>
                </div> */ }
            </div>
        </div>
    </div>
  )
}

export default Home