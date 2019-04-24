const api = "http://localhost:3001";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: token
};

// Categorias
export const fetchCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

// Postagens
export const fetchPosts = category => {
  const url = category ? `${api}/${category}/posts` : `${api}/posts`;
  return fetch(url, { headers })
    .then(res => res.json())
    .then(data => data);
};

export const fetchPost = id =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const votePost = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      option: vote
    })
  })
    .then(res => res.json())
    .then(data => data);

export const addPost = post => {
  const data = {
    ...post,
    timestamp: Date.now()
  };

  return fetch(`${api}/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data);
};

export const editPost = post => {
  const data = {
    ...post,
    timestamp: Date.now()
  };

  return fetch(`${api}/posts/${post.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data);
};

export const deletePost = post =>
  fetch(`${api}/posts/${post.id}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => data);

// Comentários
export const fetchComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

export const fetchComment = id =>
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const addComment = comment => {
  const data = {
    ...comment,
    timestamp: Date.now()
  };
  return fetch(`${api}/comments`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data);
};

export const voteComment = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(data => data);

export const editComment = comment => {
  const data = {
    ...comment,
    timestamp: Date.now()
  };

  return fetch(`${api}/comments/${comment.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => data);
};

export const deleteComment = comment =>
  fetch(`${api}/comments/${comment.id}`, {
    method: "DELETE",
    headers
  })
    .then(res => res.json())
    .then(data => data);
