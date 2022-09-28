import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'; 

const Create = ({model,toggle,save}) => {
    const [taskname,setTaskname]=useState('');
    const [description,setDescription]=useState('');
    //Create task changes
    const handlechange=(e)=>
    {
        const{name,value}= e.target
        if(name==="taskname"){
            setTaskname(value)
        }
        else{
            setDescription(value)
        }
    }
    //On click create task
    const handlesave=(e)=>
    {
        e.preventDefault()
        let taskobj={}
        taskobj["Name"]=taskname
        taskobj["Description"]=description
        save(taskobj)

    }

    return (
        <Modal isOpen={model} >
            <ModalHeader toggle={toggle}>Create task</ModalHeader>
                <ModalBody>
                    <form>
                      <div class="form-group">
                        <label>TASK NAME</label>
                        <input type="text" className='form-control' value={taskname} onChange={handlechange} name='taskname' >
                        </input>

                      </div>
                      <br></br>
                      <div className='form-group'>
                        <label>
                            Description

                        </label>
                        <textarea rows="5" className='form-control' value={description} onChange={handlechange} name='description'></textarea>

                      </div>

                    </form>
                </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handlesave}>
            Create
            </Button>{' '}
            <Button color="secondary" onClick={toggle}>
            Cancel
            </Button>
            </ModalFooter>
        </Modal>
    );
};

export default Create;
