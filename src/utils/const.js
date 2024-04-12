const USER_ID = 1;
const DATA_URL = 'https://my-json-server.typicode.com/kateworks/data/todos';
const DATA_HEADERS = {
  'Content-Type': 'application/json',
};

const FILL_OUT_MESSAGE = 'Please fill out this field before you press';
const EDIT_ERROR = `${FILL_OUT_MESSAGE} Save button`;
const ADD_ERROR = `${FILL_OUT_MESSAGE} Add button`;

const ERRMSG_READ = 'Cannot read data from server';
const ERRMSG_SAVE = 'Cannot save changes';
const ERRMSG_CREATE = 'Cannot create item';
const ERRMSG_DELETE = 'Cannot delete item';

export {
  USER_ID,
  DATA_URL,
  DATA_HEADERS,
  EDIT_ERROR,
  ADD_ERROR,
  ERRMSG_READ,
  ERRMSG_SAVE,
  ERRMSG_CREATE,
  ERRMSG_DELETE,
};
