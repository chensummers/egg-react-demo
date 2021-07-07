import request from './index';

// login
export const register = (params) => request.post('/register',params);
export const login = (params) => request.post('/login',params);
export const loginout = () => request.post('/loginout');

// user
export const getUserInfo = () => request.get('/user/get');
export const getUserById = (id) => request.get(`/user/${id}`);
export const updateUser = (params) => request.put(`/user/update`,params);
export const addUser = (params) => request.post(`/user/add`,params);
export const deleteUser = (id) => request.delete(`/user/${id}`);
export const getUserList = () => request.post(`/user/list`);

// 日记
export const diaryList = () => request.get('/diary/list');
export const diaryAdd = (params) => request.post('/diary/add',params);
export const diaryUpdate = (params) => request.post('/diary/update',params);
export const diaryDel = (id) => request.delete(`/diary/delete/${id}`);
export const diaryDetail = (id) => request.get(`/diary/detail/${id}`);