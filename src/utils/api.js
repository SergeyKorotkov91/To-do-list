const getData = async (url, headers) => {
  const queryData = { method: 'GET', headers };
  const response = await fetch(url, queryData);
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

const makeRequest = async (url, options) => {
  const response = await fetch(url, options);
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
};

const deleteData = async (url, headers, todoId) => {
  const queryData = {
    method: 'DELETE',
    headers,
  };
  return makeRequest(`${url}/${todoId}`, queryData);
};

const postData = async (url, headers, todo) => {
  const queryData = {
    method: 'POST',
    headers,
    body: JSON.stringify(todo),
  };
  return makeRequest(url, queryData);
};

const patchData = async (url, headers, todoId, todo) => {
  const queryData = {
    method: 'PATCH',
    headers,
    body: JSON.stringify(todo),
  };
  return makeRequest(`${url}/${todoId}`, queryData);
};

export {
  getData,
  deleteData,
  postData,
  patchData,
};
