import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addTask,
  deleteTask,
  getTasks,
  newTaskTitleOnchange,
  reorderTask,
  setTaskData,
  setTaskId,
} from "./../../redux/singleTodoReducer";
import { Form } from "react-final-form";
import { InputFormWithState } from "../components/smartItems/inputForm";
import "../active todo/active.scss";
import "./singleTodo.scss";
import deleteImg from "../../assets/icons/delete.png";
import editImg from "../../assets/icons/edit.png";
import arrowUp from "../../assets/icons/ArrowUp.png";
import EditingTask from "./editingTask";
import { parseDate } from "../active todo/active";
import Preloader from "../components/smartItems/preloader";

const SingleTodo = () => {
  const { choosenTodoTitle } = useSelector((state) => state.toDoReducer);
  const { tasksList, newTaskTitle, isLoading } = useSelector(
    (state) => state.singleTodoReducer
  );
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [choosenTodoTitle]);

  const submitTask = () => {
    dispatch(addTask());
  };

  const upTask = (taskId, afterId) => {
    dispatch(setTaskId(taskId));
    dispatch(reorderTask(tasksList[afterId].id));
  };

  return (
    <div className="taskContainer">
      {isLoading ? (
        <Preloader />
      ) : (
        <div>
          <h1>{choosenTodoTitle} </h1>
          <div className="formDiv">
            {" "}
            <Form
              onSubmit={submitTask}
              render={({ submitError, handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                  {InputFormWithState({
                    type: "text",
                    placeholder: "Enter new task",
                    name: "title",
                    textValue: newTaskTitle,
                    onChange: (text) => {
                      dispatch(newTaskTitleOnchange(text));
                    },
                  })}
                  <button className="submitBtn" type="submit">
                    +
                  </button>
                </form>
              )}
            />
          </div>

          <div className="taskBlock">
            {tasksList.map((item, index) => {
              return (
                <div className="taskItem" key={item.id}>
                  <h4> {item.title}</h4>
                  <div className="descr">{item.description}</div>
                  <div className="dates">
                    <div className="added">
                      <span className="dateText"> Added:</span>{" "}
                      {item.addedDate && parseDate(item.addedDate)}
                    </div>
                    <div className="start">
                      <span className="dateText">Start:</span>{" "}
                      {item.startDate && parseDate(item.startDate)}
                    </div>
                    <div className="dead">
                      <span className="dateText">Deadline:</span>{" "}
                      {item.deadline && parseDate(item.deadline)}
                    </div>
                    <hr className="line" />
                  </div>

                  <img
                    className="arrowUp"
                    src={arrowUp}
                    onClick={(e) => {
                      upTask(item.id, index - 1);
                      e.stopPropagation();
                    }}
                    alt=""
                  />
                  <img
                    src={editImg}
                    alt=""
                    className="editImg"
                    onClick={(e) => {
                      setEditMode(true);
                      dispatch(setTaskData(item));
                      e.stopPropagation();
                    }}
                  />
                  <img
                    onClick={(e) => {
                      dispatch(deleteTask(item.id));
                      e.stopPropagation();
                    }}
                    className="delImg"
                    src={deleteImg}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {editMode && <EditingTask setEditMode={setEditMode} />}
    </div>
  );
};

export default SingleTodo;
