import API from './api';

export const getUsersRequest = async () => {
  const response = await API.get('/users');
  return response.data;
};

export const postUserRequest = async (data) => {
  const response = await API.post('/users', data);
  return response.data;
};

export const deleteUserRequest = (id) => API.delete(`/users/${id}`);

export const patchUserRequest = async (data) => {
  const response = await API.patch(`/users/${data.id}`, data);
  return response.data;
};
