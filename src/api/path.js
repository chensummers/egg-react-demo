import request from './index';

export const diaryList = () => request.get('/diary/list');
export const diaryAdd = (params) => request.post('/diary/add',params);
export const diaryUpdate = (params) => request.post('/diary/update',params);
export const diaryDel = (id) => request.delete(`/diary/delete/${id}`);
export const diaryDetail = (id) => request.get(`/diary/detail/${id}`);