import React from 'react'
import { useState } from 'react'
import {doc,updateDoc} from 'firebase/firestore'
import { db } from '../firebase/firebase'

const EditTask = ({task,id}) => {
 

  const [updatedTask,setUpdatesTask]=useState([task])
  const [updatedPriority,setUpdatesPriority]=useState("low")
  const [updatedCat,setUpdatesCat]=useState("general")

  const updateTask= async(e)=>{
    e.preventDefault();
    try{
      const taskDocument=doc(db,"tasks",id)
      await updateDoc(taskDocument,{
      task:updatedTask,
      isChecked:false,
      category: updatedCat,
      priority: updatedPriority

    })
    setUpdatesTask((prevTask) => updatedTask);
    setUpdatesPriority((prevPriority)=>updatedPriority);
    setUpdatesCat((prevCat)=>updatedCat);

    // Close the modal
    const modal = new window.bootstrap.Modal(document.getElementById(`id${id}`));
    modal.hide();

    }
    catch(err)
    {
      console.log(err)
    }
  }
  return (
    <>
<button type="submit" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#id${id}`}>
  Edit
</button>

<div className="modal fade" id={`id${id}`} tabIndex="-1" aria-labelledby="updateTaskLabel" aria-hidden="true">
  <div className="modal-dialog">
  <form className="d-flex">
 
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="updateTaskLabel">Update Task</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
      <input 
     type="text"
     className="form-control"
     placeholder="Update a task"
     defaultValue={updatedTask}
     onChange={(e)=> setUpdatesTask(e.target.value)}
     />
       <input 
     type="text"
     className="form-control"
     placeholder="Update category"
     defaultValue={updatedCat}
     onChange={(e)=> setUpdatesCat(e.target.value)}
     />
       <input 
     type="text"
     className="form-control"
     placeholder="Update priority"
     defaultValue={updatedPriority}
     onChange={(e)=> setUpdatesPriority(e.target.value)}
     />
      </div>
      <div className="modal-footer">
        <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary" onClick={e=>updateTask(e)}>Update Task</button>
        
      </div>
    </div>
    </form>
  </div>
</div>
    </>
  )
}

export default EditTask