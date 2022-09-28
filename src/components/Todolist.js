import React,{useEffect, useState} from 'react';
import Create from './modals/create';
import Card from '../components/card';

const Todolist = () => {
    const [model, setModal] =  useState(false);
    const toggle = ()=>{setModal(!model)}
    const[tasklist,setTasklist]=useState([])
    

    useEffect(()=>{
        let arr=localStorage.getItem("tasklist")
        if(arr){
            let obj=JSON.parse(arr)
            setTasklist(obj)
        }
    },[])
     const deletetask=(index)=>
     {
        console.log("del")
        let templist=tasklist
        templist.splice(index,1)
        localStorage.setItem("tasklist",JSON.stringify(templist))
        
        setTasklist(templist)
        window.location.reload()
     }

    const SaveTask=(taskobj)=>{
        let templist=tasklist
        templist.push(taskobj)
        localStorage.setItem("tasklist" , JSON.stringify(templist))
        setTasklist(templist)
        setModal(false)
      }
    return (
        <div>
            <div className='header text-center'>
              <h2>ToDoList</h2>
              <button className="btn btn-primary mt-1.5" onClick={()=> setModal(true)}>Create Task</button>
            </div>
            <div className='task-container'>
                {tasklist && tasklist.map((obj,index)=> <Card taskobj={obj} index={index} deleteTask={deletetask}/>)}

            </div>
            <Create toggle={toggle} model={model} save={SaveTask} />
        </div>
    );
};

export default Todolist;