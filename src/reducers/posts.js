
export const NOT_FOUND = 'NOT_FOUND'
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";

const posts = (state = {}, action) => {
  const { posts, post } = action;
  switch (action.type) {
    case RECEIVE_POSTS:
      return posts;
    case RECEIVE_POST:
      return post;
    case NOT_FOUND:
      return {
        ...state,
        error:true
        
      }
    default:
      return state;
  }
};

export default posts;
