import activeReducer from "./activeReducer";
import appReducer from "./appReducer";
import { configureStore } from "@reduxjs/toolkit";
import singleTodoReducer from "./singleTodoReducer";

export default configureStore({
  reducer: {
    appReducer: appReducer,
    toDoReducer: activeReducer,
    singleTodoReducer: singleTodoReducer,
  },
});

/* const rootReducer = combineReducers({
  active: activeReducer,
  finished: finishedReducer,
  app: appReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
window.store = store;
export default store;
 */
