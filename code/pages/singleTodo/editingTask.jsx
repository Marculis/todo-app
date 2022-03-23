import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import {
  InputForm,
  InputFormWithState,
} from "../components/smartItems/inputForm";
import "../active todo/editingTodo.scss";
import {
  descrOnchange,
  editTask,
  titleOnchange,
} from "../../redux/singleTodoReducer";

const EditingTask = ({ setEditMode }) => {
  const { taskTitle, taskDescr } = useSelector(
    (state) => state.singleTodoReducer
  );
  const dispatch = useDispatch();

  const saveChanges = (values) => {
    values.title = taskTitle;
    values.description = taskDescr;
    dispatch(editTask(values));
    setEditMode(false);
  };

  const getDate = (date) => {
    if (!date) {
      return (date = "2022-01-01");
    }
    date = date.split("T")[0];
    debugger;
    return date;
  };

  return (
    <div className="editingTodo_container">
      <div className="editingTodo">
        <Form
          onSubmit={saveChanges}
          render={({ submitError, handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              {InputFormWithState({
                type: "text",
                placeholder: "Edit your list title",
                name: "title",
                textValue: taskTitle,
                onChange: (text) => {
                  dispatch(titleOnchange(text));
                },
              })}

              {InputFormWithState({
                type: "text",
                placeholder: "Enter task description",
                name: "description",
                textValue: taskDescr,
                onChange: (text) => {
                  dispatch(descrOnchange(text));
                },
              })}
              {InputForm({
                type: "date",
                placeholder: "Enter task beginning",
                name: "startDate",
              })}
              {InputForm({
                type: "date",
                placeholder: "Enter task deadline",
                name: "deadline",
              })}

              <div className="buttonBlock">
                <button type="submit">Save changes</button>

                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default EditingTask;
