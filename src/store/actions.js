import { compose } from "./constants";
import { actionsCreator } from "../utils";
import { fetchArticles } from "../store/services";

export const actions = actionsCreator(compose);

export const A_FetchAllArticlesSuccess = (payload) => ({
  type: "FETCH_ARTICLES_SUCCESS",
  payload,
});
export const A_FetchAllArticlesFailure = (err) => ({
  type: "FETCH_ARTICLES_FAILURE",
  payload: err,
});

export const A_FetchAllArticlesRequest = (_, callback) => {
  return (dispatch) => {
    return fetchArticles()
      .then((res) => {
        dispatch(A_FetchAllArticlesSuccess(res));
      })
      .catch((err) => {
        dispatch(A_FetchAllArticlesFailure(err));
      })
      .finally(() => {
        callback && typeof callback === "function" && callback();
      });
  };
};
