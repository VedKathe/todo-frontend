import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Quick = ({setOpen, item}) => {

  const [title, setTitle] = useState(item.title);
  const navigate = useNavigate();

  const updateTaskHandler = async(e) => {
    e.preventDefault();

    try {

      const {data} = await axios.put("/api/todos/update", {
        _id: item._id,
        title
      });
      console.log(data);
      toast.success("You have successfully updated the task!");
      navigate('/');
      window.location.reload();
      setOpen(false);

    } catch (err) {
      toast.error("Updated failed, please try again!")
    }
  }

  return (
    <div className='quick-container'>
        <form className='formUpdate' onSubmit={updateTaskHandler}>
          <div className="card-quick">
            <div className="card-row">
              <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} required />
            </div>
            <div className="card-row">
                <button className='update'>Update <FontAwesomeIcon icon={faRefresh} /> </button>
                <button className='update' onClick={() => setOpen(false)}>Close</button>

            </div>
          </div>
        </form>
    </div>
  )
}

export default Quick