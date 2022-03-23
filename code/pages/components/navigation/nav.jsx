import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { chooseTodo } from "../../../redux/activeReducer";

const Nav = () => {
  const { todoList } = useSelector((state) => state.toDoReducer);
  const dispatch = useDispatch();
  return (
    <div className="nav">
      <NavLink to="/">home page</NavLink> <hr />
      <NavLink to="/active">List of todos</NavLink>
      <ul>
        {todoList.map((item) => {
          return (
            <li
              onClick={() =>
                dispatch(chooseTodo({ id: item.id, title: item.title }))
              }
            >
              <NavLink to={`/todo`}> {item.title} </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Nav;
