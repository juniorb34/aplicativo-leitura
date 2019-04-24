import * as api from "../utils/api";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const receiveCategories = categories => {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  };
};

export const fetchCategories = () => {
  return dispatch => {
    return api
      .fetchCategories()
      .then(categories => dispatch(receiveCategories(categories)));
  };
};
