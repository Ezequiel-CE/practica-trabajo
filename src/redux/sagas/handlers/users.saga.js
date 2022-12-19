import { call, put, takeLatest, all } from 'redux-saga/effects';
import { message } from 'antd';
import {
  USERS_FETCH_REQUESTED,
  USER_POST_REQUESTED,
  USER_DELETE_REQUESTED,
  USER_PATCH_REQUESTED,
  setUsers,
  setUser,
  setLoading,
  setError,
  deleteUser,
  updateUser,
} from '../../reducers/user';
import { closeModal } from '../../reducers/modal';
import {
  getUsersRequest,
  postUserRequest,
  deleteUserRequest,
  patchUserRequest,
} from '../../../api/metodos';

function* handleGetUser() {
  try {
    yield put(setLoading(true));
    const users = yield call(getUsersRequest);

    yield put(setUsers(users));
    yield put(setLoading(false));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setError(error.message));
  }
}

function* handlePostUser(action) {
  try {
    yield put(setLoading(true));
    const user = yield call(postUserRequest, action.payload);

    yield put(setUser(user));
    yield put(setLoading(false));
    yield put(closeModal());
    message.success('user created');
  } catch (error) {
    yield put(setLoading(false));
    yield put(closeModal());
    message.error(error.message);
  }
}

function* handleDeleteUser(action) {
  try {
    yield put(setLoading(true));
    message.loading('Deleting user ...');
    yield call(deleteUserRequest, action.payload);

    yield put(deleteUser(action.payload));
    yield put(setLoading(false));

    message.success('user deleted');
  } catch (error) {
    yield put(setLoading(false));
    message.error(error.message);
  }
}

function* handleUpdateUser(action) {
  try {
    yield put(setLoading(true));
    message.loading('updating user ...');
    const user = yield call(patchUserRequest, action.payload);

    yield put(updateUser(user));
    yield put(setLoading(false));

    message.success('user Update sucessfully');
  } catch (error) {
    yield put(setLoading(false));
    message.error(error.message);
  }
}

function* userSaga() {
  yield all([
    takeLatest(USERS_FETCH_REQUESTED, handleGetUser),
    takeLatest(USER_POST_REQUESTED, handlePostUser),
    takeLatest(USER_DELETE_REQUESTED, handleDeleteUser),
    takeLatest(USER_PATCH_REQUESTED, handleUpdateUser),
  ]);
}

export default userSaga;
