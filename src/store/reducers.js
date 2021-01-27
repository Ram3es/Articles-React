import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { ArticlesReducer } from "../containers/Articles/store";
import { AuthReducer } from "../containers/Auth/store";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    articlesReducer: ArticlesReducer,
    authReducer: AuthReducer,
  });
