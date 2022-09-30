import React, { useEffect, useState } from "react";
import Create from "./modals/create";
import Card from "../components/card";
import { Input, Button, Flex, Wrap, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
const Todolist = () => {
  const [model, setModal] = useState(false);
  const toggle = () => {
    setModal(!model);
  };
  const [tasklist, setTasklist] = useState([]);
  const [searchList, setSearchList] = useState("");
const [completed,setCompleted] = useState([]);
  useEffect(() => {
    let arr = localStorage.getItem("tasklist");
    let com = localStorage.getItem("completed")
    if (arr) {
      let obj = JSON.parse(arr);
     
      setTasklist(obj);
    }
    if(com){
        let comp = JSON.parse(com)
        setCompleted(comp);
    }
  }, []);
  const handleSearch = () => {
    let arr = localStorage.getItem("tasklist");

    if (arr && searchList.length > 0) {
      let obj = JSON.parse(arr);
      const templist = obj.filter(
        (element) => element.Name.toLowerCase() === searchList.toLowerCase()
      );

      templist.length > 0 ? setTasklist(templist) : setTasklist(tasklist);
    }
  };
  const deletetask = (index) => {
    let templist = tasklist;
    templist.splice(index, 1);
    localStorage.setItem("tasklist", JSON.stringify(templist));

    setTasklist(templist);
    window.location.reload();
  };
  const updateListArray = (obj, index) => {
    let templist = tasklist;
    templist[index] = obj;
    localStorage.setItem("tasklist", JSON.stringify(templist));
    setTasklist(templist);
    window.location.reload();
  };
  const completeTask = (obj,index) => {
    let temp =[...completed,obj]
    localStorage.setItem("completed",JSON.stringify(temp))
    deletetask(index)
  };
  const deleteCompleted = (taskobj)=> {
    let arr = localStorage.getItem("completed");
    if (arr ) {
      let obj = JSON.parse(arr);
      const templist = obj.filter(
        (element) => element.Name !== taskobj.Name
      );
      localStorage.setItem("completed",JSON.stringify(templist))
      window.location.reload();
    }
  }
  const SaveTask = (taskobj) => {
    let templist = tasklist;
    templist.push(taskobj);
    localStorage.setItem("tasklist", JSON.stringify(templist));
    setTasklist(templist);
    setModal(false);
  };
  return (
    <div>
      <Flex
        align="center"
        h="70px"
        justify={"space-between"}
        style={{ backgroundColor: "#EDF2F7", padding: "0px 20px" }}
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="30px"
          fontWeight="620"
        >
          ToDoList
        </Text>
        <Flex gap="10px">
          <Input
            type={"text"}
            placeholder={"SearchTask"}
            onChange={(e) => setSearchList(e.target.value)}
          ></Input>
          <Button colorScheme="blue" onClick={handleSearch}>
            <h1>Search</h1>
          </Button>
          <Button
            colorScheme="blue"
            style={{ padding: "0px 25px" }}
            onClick={() => setModal(true)}
          >
            <h1>Create Task</h1>
          </Button>
        </Flex>
      </Flex>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Todo Lists</Tab>
          <Tab>Completed Lists</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
          <Wrap style={{ padding: "15px 20px" }}>
        {tasklist &&
          tasklist.map((obj, index) => (
            <Card
              taskobj={obj}
              index={index}
              key={index}
              completedTask={completeTask}
              deleteTask={deletetask}
              isChecked={true}
              updateListArray={updateListArray}
            />
          ))}
      </Wrap>
          </TabPanel>
          <TabPanel>
          <Wrap style={{ padding: "15px 20px" }}>
        {completed &&
          completed.map((obj, index) => (
            <Card
              taskobj={obj}
              index={index}
              key={index}
              isChecked={false}
              deleteTask={deletetask}
              deleteCompleted={deleteCompleted}
              updateListArray={updateListArray}
            />
          ))}
      </Wrap>
          </TabPanel>
        </TabPanels>
      </Tabs>
      
      <Create toggle={toggle} model={model} save={SaveTask} />
    </div>
  );
};

export default Todolist;
