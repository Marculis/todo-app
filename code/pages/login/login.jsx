import { Form } from "react-final-form";
import { InputForm } from "../components/smartItems/inputForm";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../../redux/appReducer";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.appReducer.isAuth);
  let navigate = useNavigate();

  const onSubmit = (values) => {
    dispatch(getLogin(values));
    navigate("/");
  };

  return (
    <div>
      {!isLogin ? (
        <div>
          <h1>Login</h1>
          <Form
            onSubmit={onSubmit}
            render={({ submitError, handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                {InputForm({
                  name: "email",
                  placeholder: "free@samuraijs.com",
                  type: "text",
                })}
                {InputForm({
                  name: "password",
                  placeholder: "free",
                  type: "password",
                })}
                {InputForm({
                  name: "rememberMe",
                  placeholder: "remember me",
                  type: "checkbox",
                })}
                <div className="btnsLogin">
                  <button type="submit">Submit</button>
                  <button type="button" onClick={form.reset}>
                    Reset
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};
export default Login;
