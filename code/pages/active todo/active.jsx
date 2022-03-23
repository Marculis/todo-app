import { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { InputFormWithState } from "../components/smartItems/inputForm";
import {
  getAllTodos,
  postTodoList,
  deleteTodoList,
  chooseTodo,
  changeTaskTitle,
  reorderTodo,
} from "./../../redux/activeReducer";
import deleteImg from "../../assets/icons/delete.png";
import editImg from "../../assets/icons/edit.png";
import arrowUp from "../../assets/icons/ArrowUp.png";
import "./active.scss";
import EditingTodo from "./editingTodo";
import { useNavigate } from "react-router-dom";
import Preloader from "../components/smartItems/preloader";

export const parseDate = (date) => {
  function parse(arr, end) {
    return arr
      .split("")
      .filter((item, index) => {
        if (index < end) return item;
      })
      .join("");
  }
  let day = parse(date, 10);
  return (
    <span className="boldDate">
      <b>{day} </b>
      {/*   <i> at </i>
      <b className="boldDate">{hour}</b> */}
    </span>
  );
};

const Active = () => {
  const dispatch = useDispatch();
  const { todoList, isEmpty, taskTitle, isLoading } = useSelector(
    (state) => state.toDoReducer
  );
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  const submitTask = () => {
    dispatch(postTodoList());
  };

  const toEditMode = (todo) => {
    setEditMode(true);
    dispatch(chooseTodo({ id: todo.id, title: todo.title }));
  };

  const reorderList = (targetId, index) => {
    dispatch(chooseTodo({ id: targetId, title: null }));
    dispatch(reorderTodo(todoList[index].id));
  };

  return (
    <div className="todoContainer">
      <h1>List of Todos</h1>
      {isLoading ? (
        <Preloader />
      ) : (
        <div>
          <Form
            onSubmit={submitTask}
            render={({ submitError, handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                {InputFormWithState({
                  type: "text",
                  placeholder: "Enter list name",
                  name: "title",
                  textValue: taskTitle,
                  onChange: (text) => {
                    dispatch(changeTaskTitle(text));
                  },
                })}
                <div className="buttonBlock">
                  <button type="submit">Add list</button>

                  <button
                    type="button"
                    onClick={() => dispatch(changeTaskTitle(""))}
                  >
                    Reset
                  </button>
                </div>
              </form>
            )}
          />
          {isEmpty ? (
            "You haven't any tasks"
          ) : (
            <div className="todoBlock">
              {todoList.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      dispatch(chooseTodo({ id: item.id, title: item.title }));
                      navigate("/todo");
                    }}
                  >
                    <div className="todoItem">
                      <h4>{item.title}</h4>
                      <div className="date">
                        Added {parseDate(item.addedDate, "Added")}
                      </div>
                      <img
                        onClick={(e) => {
                          dispatch(deleteTodoList(item.id));
                          e.stopPropagation();
                        }}
                        className="delImg"
                        src={deleteImg}
                        alt=""
                      />{" "}
                      <img
                        src={editImg}
                        alt=""
                        className="editImg "
                        onClick={(e) => {
                          toEditMode(item);
                          e.stopPropagation();
                        }}
                      />
                      <img
                        className="arrowUp"
                        src={arrowUp}
                        onClick={(e) => {
                          reorderList(item.id, index - 1);
                          e.stopPropagation();
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {editMode && <EditingTodo setEditMode={setEditMode} />}
    </div>
  );
};

export default Active;
