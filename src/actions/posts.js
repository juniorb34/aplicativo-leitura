import * as api from "../utils/api";
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";

export const fetchPosts = category => {
  return dispatch => {
    return api.fetchPosts(category).then(posts =>
      dispatch({
        type: RECEIVE_POSTS,
        posts
      })
    );
  };
};

export const fetchPost = id => {
  return dispatch => {
    return api.fetchPost(id).then(post =>
      dispatch({
        type: RECEIVE_POST,
        post
      })
    );
  };
};

export const votePost = (id, option) => {
  return dispatch => {
    return api.votePost(id, option).then(post =>
      api.fetchPosts().then(posts =>
        dispatch({
          type: RECEIVE_POSTS,
          posts
        })
      )
    );
  };
};

export const votePostDetail = (id, option) => {
  return dispatch => {
    return api.votePost(id, option).then(post =>
      api.fetchPost(post.id).then(post =>
        dispatch({
          type: RECEIVE_POST,
          post
        })
      )
    );
  };
};

export const addPost = post => {
  post = {
    ...post,
    timestamp: Date.now()
  };

  return dispatch => {
    return api.addPost(post).then(post =>
      api.fetchPosts(post.category).then(posts =>
        dispatch({
          type: RECEIVE_POSTS,
          posts
        })
      )
    );
  };
};

export const editPost = post => {
  return dispatch => {
    return api.editPost(post).then(post =>
      api.fetchPosts(post.category).then(posts =>
        dispatch({
          type: RECEIVE_POSTS,
          posts
        })
      )
    );
  };
};

export const deletePost = post => {
  return dispatch => {
    return api.deletePost(post).then(post =>
      api.fetchPosts().then(posts =>
        dispatch({
          type: RECEIVE_POSTS,
          posts
        })
      )
    );
  };
};
