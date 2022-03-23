import { Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { editTodoList, changeEditedTitle } from "../../redux/activeReducer";
import { InputFormWithState } from "../components/smartItems/inputForm";
import "./editingTodo.scss";

const EditingTodo = ({ setEditMode }) => {
  const dispatch = useDispatch();
  const { choosenTodoTitle } = useSelector((state) => state.toDoReducer);

  const saveChanges = (value) => {
    dispatch(editTodoList(value));
    setEditMode(false);
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
                name: "Edit title",
                textValue: choosenTodoTitle,
                onChange: (text) => {
                  dispatch(changeEditedTitle(text));
                },
              })}
              <div className="buttonBlock">
                <button type="submit">Save changes</button>

                <button type="button" onClick={() => setEditMode(false)}>
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

export default EditingTodo;
