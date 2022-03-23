import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getLogout } from "./../../redux/appReducer";
import "./home.scss";

const Home = () => {
  const { email, error, isAuth } = useSelector((state) => state.appReducer);

  const dispatch = useDispatch();
  let navigate = useNavigate();

  return (
    <div className="homePage">
      <h1>Home page</h1>
      <h2>{email}</h2>
      <div className="error">{error}</div>

      <p className="account">
        <div> Testing account: </div>{" "}
        <div>
          {" "}
          <i>login:</i> free@samuraijs.com
        </div>
        <div>
          {" "}
          <i>password:</i> free
        </div>
      </p>
      <h4>Push the button below to {isAuth ? "Quit" : "Enter"} your account</h4>
      {!isAuth ? (
        <button onClick={() => navigate("login")}>Login</button>
      ) : (
        <button onClick={() => dispatch(getLogout())}>Logout</button>
      )}
    </div>
  );
};
export default Home;
