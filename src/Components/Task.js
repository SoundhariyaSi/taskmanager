import { collection, getDocs, addDoc, deleteDoc, doc, runTransaction } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import EditTask from './EditTask';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [createTask, setCreateTask] = useState(" ");
  const [category, setCategory] = useState("general"); // Add category state
  const [priority, setPriority] = useState("low"); // Add priority state

  // eslint-disable-next-line no-unused-vars
  const [checkedState, setCheckedState] = useState([]);

  const collectionRef = collection(db, 'tasks');

  const sortByPriority=(tasks)=>{
    const priorityOrder={low: 0, medium: 1, high: 2};
    return tasks.sort((a,b)=>priorityOrder[a.priority]-priorityOrder[b.priority]);
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const taskSnapshot = await getDocs(collectionRef);
        let tasksData = taskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        tasksData=sortByPriority(tasksData);
        setTasks(tasksData);
        setCheckedState(tasksData.map(task=>task.isChecked));
      } catch (err) {
        console.log(err);
      }
    };
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionRef]);

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collectionRef, {
        task: createTask,
        isChecked: false,
        category: category,
        priority: priority
      });
     // window.location.reload();
     const updatedTaskSnapshot = await getDocs(collectionRef);
     const updatedTasksData = updatedTaskSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
     setTasks(updatedTasksData);
 
     // Clear the input field
     setCreateTask("");
     setCategory("general");
     setPriority("low");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this task?');
      if (confirmDelete) {
        const documentRef = doc(db, "tasks", id);
        await deleteDoc(documentRef);
       // window.location.reload();
       setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkBoxHandler = async (event) => {
    const taskId=event.target.name;
    const index = tasks.findIndex((task) => task.id.toString() === taskId);

    try {
      const docRef = doc(db, "tasks", event.target.name);
      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(docRef);
        if (!taskDoc.exists()) {
          // eslint-disable-next-line no-throw-literal
          throw "Document does not exist!";
        }
        const newValue = !taskDoc.data().isChecked;
        transaction.update(docRef, { isChecked: newValue });
      });
      
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        newTasks[index] = { ...newTasks[index], isChecked: !newTasks[index].isChecked };
        return newTasks;
      });
      

    } catch (error) {
      console.log("Transaction failed: ", error);
    }
  };


  console.log("tasks", tasks);

  return (
    <>
      <div className="container">
        <div className="row col-md-12">
          <div className="card card-white" style={{ width: '800px', height: '600px' }}>
            <div className="card-body">
              <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTask">
                Add Task
              </button>

              {tasks.map(({ task, id, isChecked }) => (
                <div className="todo-list" key={id}>
                  <div className="todo-item">
                    <hr />
                    <span className={`${isChecked === true ? 'done' : ' '}`}>
                      <div className="checker">
                        <span>
                          <input
                            type="checkbox"
                            defaultValue={isChecked}
                            onChange={(event) => checkBoxHandler(event)}
                            name={id}
                          />
                        </span>
                      </div>
                      &nbsp; {task} - Category: {category}, Priority: {priority}
                    </span>
                    <div className="text-end">
                      <EditTask task={task} id={id} />
                      <button type="button"  className="btn btn-danger ms-2" onClick={() => deleteTask(id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="addTask" tabIndex="-1" aria-labelledby="addTaskLabel" aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={submitTask} className="d-flex">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addTaskLabel">
                  Add Task
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a task"
                  onChange={(e) => setCreateTask(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add category"
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add priority"
                  onChange={(e) => setPriority(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Task;
