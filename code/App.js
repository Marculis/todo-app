import "./App.scss";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Active from "./pages/active todo/active";
import Nav from "./pages/components/navigation/nav";
import Home from "./pages/main/home";
import Login from "./pages/login/login";
import { getAuth } from "./redux/appReducer";
import { useDispatch, useSelector } from "react-redux";
import SingleTodo from "./pages/singleTodo/singleTodo";
import Preloader from "./pages/components/smartItems/preloader";

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.appReducer);

  useEffect(() => {
    dispatch(getAuth());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <span> ToDo List project</span>
      </header>
      <Nav className="nav" />
      <div className="pagesWrapper">
        {isLoading ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/active" element={<Active />} />
            <Route path="login" element={<Login />} />
            <Route path="todo" element={<SingleTodo />} />
          </Routes>
        )}
      </div>
    </div>
  );
};
export default App;
