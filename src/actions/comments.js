import uuid from "uuid";
import * as api from "../utils/api";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const RECEIVE_COMMENT = "RECEIVE_COMMENT";

export const fetchComments = id => {
  return dispatch => {
    return api.fetchComments(id).then(comments =>
      dispatch({
        type: RECEIVE_COMMENTS,
        comments
      })
    );
  };
};

export const fetchComment = id => {
  return dispatch => {
    return api.fetchComment(id).then(comment =>
      dispatch({
        type: RECEIVE_COMMENT,
        comment
      })
    );
  };
};

export const voteComment = (id, option) => {
  return dispatch => {
    return api.voteComment(id, option).then(comment =>
      api.fetchComments(comment.parentId).then(comments =>
        dispatch({
          type: RECEIVE_COMMENTS,
          comments
        })
      )
    );
  };
};

export const addComment = comment => {
  comment = {
    ...comment,
    id: uuid.v4(),
    timestamp: Date.now()
  };

  return dispatch => {
    return api.addComment(comment).then(comment =>
      api.fetchComments(comment.parentId).then(comments =>
        dispatch({
          type: RECEIVE_COMMENTS,
          comments
        })
      )
    );
  };
};

export const deleteComment = comment => {
  return dispatch => {
    return api.deleteComment(comment).then(comment =>
      api.fetchComments(comment.parentId).then(comments =>
        dispatch({
          type: RECEIVE_COMMENTS,
          comments
        })
      )
    );
  };
};

export const editComment = comment => {
  return dispatch => {
    return api.editComment(comment).then(comment =>
      api.fetchComments(comment.parentId).then(comments =>
        dispatch({
          type: RECEIVE_COMMENTS,
          comments
        })
      )
    );
  };
};
