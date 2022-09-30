import React, { useState } from "react";
import EditTaskPopup from "./modals/EditTask";
//icons
//labels
import { FiEdit } from "react-icons/fi";
import { Switch, Flex } from "@chakra-ui/react";
import { RiDeleteBin6Line } from "react-icons/ri";
const Card = ({
  taskobj,
  index,
  deleteTask,
  updateListArray,
  completedTask,
  deleteCompleted,
  isChecked,
}) => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];

  const Delete = () => {
    isChecked ? deleteTask(index) : deleteCompleted(taskobj);
  };
  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  return (
    <Flex
      direction={"column"}
      h="200px"
      w="250px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      style={{ margin: "10px", padding: "10px" }}
      justify={"space-between"}
    >
      <Flex justify={"space-between"}>
        <h1
          style={{
            color: colors[index % 5].primaryColor,
            fontSize: "18px",
            fontWeight: "700",
          }}
        >
          {taskobj.Name}
        </h1>
        <Switch
          size="md"
          onChange={(e) => {
            if (e.target.checked) {
              completedTask(taskobj, index);
            }
          }}
          isChecked={!isChecked}
        />
      </Flex>

      <h1 style={{ fontSize: "14px" }}>{taskobj.Description}</h1>
      <Flex style={{ gap: "10px" }}>
        <RiDeleteBin6Line
          onClick={Delete}
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
        {isChecked ? (
          <FiEdit
            onClick={() => setModal(true)}
            style={{ cursor: "pointer", fontSize: "20px" }}
          />
        ) : null}
      </Flex>

      <EditTaskPopup
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskobj={taskobj}
      />
    </Flex>
  );
};

export default Card;
