import React,{useEffect, useState} from 'react';
import Create from './modals/create';
import Card from '../components/card';
import { Input ,Button,Flex,Wrap,Text,Box,Image} from '@chakra-ui/react'
const Todolist = () => {
    const [model, setModal] =  useState(false);
    const toggle = ()=>{setModal(!model)}
    const[tasklist,setTasklist]=useState([])
    const [searchList,setSearchList] = useState("")

    useEffect(()=>{
        let arr=localStorage.getItem("tasklist")
        if(arr){
            let obj=JSON.parse(arr)
            setTasklist(obj)
        }
    },[])
    const handleSearch = ()=> {
        let arr=localStorage.getItem("tasklist");
        
        if(arr && searchList.length>0){
            let obj=JSON.parse(arr)
            const templist = obj.filter(element => element.Name.toLowerCase() === searchList.toLowerCase());
           
            templist.length>0?setTasklist(templist):setTasklist(tasklist)

            
        }
    }
     const deletetask=(index)=>
     {
        console.log("del")
        let templist=tasklist
        templist.splice(index,1)
        localStorage.setItem("tasklist",JSON.stringify(templist))

        setTasklist(templist)
        window.location.reload()
     }
     const updateListArray=(obj,index)=>
     {
        let templist=tasklist
        templist[index]=obj
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
        <div >
              
            <Flex align="center" h="70px" justify={"space-between"} style={{backgroundColor:"#EDF2F7",padding:"0px 20px"}} >
            <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='30px'
            fontWeight='620' >ToDoList</Text>
            <Flex  gap="10px">
                <Input type={"text"} placeholder={"SearchTask"}  onChange={(e)=>setSearchList(e.target.value)} ></Input>
                <Button colorScheme="blue" onClick={handleSearch}><h1>Search</h1></Button>
                <Button colorScheme="blue" style={{padding:"0px 25px"}} onClick={()=> setModal(true)}><h1>Create Task</h1></Button>
              </Flex>
            </Flex>
            
            <Wrap style={{padding:"15px 20px"}}>
                {tasklist && tasklist.map((obj,index)=> <Card taskobj={obj} index={index} key={index}deleteTask={deletetask}  updateListArray={updateListArray}/>)}

            </Wrap>
            <Create toggle={toggle} model={model} save={SaveTask} />
        </div>
    );
};

export default Todolist;