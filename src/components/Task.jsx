import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Quick from './Quick';

const Task = ({item}) => {

    
    const [open, setOpen] = useState(false);
    const idToDo = item._id;
    const navigate = useNavigate();

    const deleteTaskHandler = async (e) => {
        e.preventDefault();

        try {

            const {data} = await axios.delete(`/api/todos/delete/${idToDo}`);
            if(data) {
                navigate("/");
                window.location.reload();
                
            }

        } catch(error) {
            console.log(error.message);
            toast.error('Error deleting task!');
        }

    }

  return (
    <>
        <div className="to-do-group">
            <div className="to-do-text">
                <p className="to-do-task">{item.title}</p>
            </div>
            <div className="to-do-action">
                <button> <FontAwesomeIcon icon={faPencil} onClick={() => setOpen(true)} /> </button>
                <button onClick={(deleteTaskHandler)}> <FontAwesomeIcon icon={faTrashAlt} /> </button>
            </div>
        </div>
        {open && <Quick setOpen={setOpen} item={item} />}
    </>
  )
}

export default Task