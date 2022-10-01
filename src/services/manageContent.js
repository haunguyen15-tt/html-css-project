import { MANAGEMENT_CONTENT } from '../ultis/constant';
import { sendDelete, sendGet, sendPatch, sendPost, sendPut } from './axios';

export const create = (type, payload) =>
  sendPost(`${type}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });

export const getAll = (type, params) => sendGet(`${type}`, params);

export const update = (type, id, payload) => {
  if (type === MANAGEMENT_CONTENT[0].value) {
    return sendPut(`${type}/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
  } else {
    return sendPatch(`${type}/${id}`, payload);
  }
};
export const remove = (type, id) => sendDelete(`${type}/${id}`);

export const getImage = (type, imageField) => sendGet(`${type}/image/${imageField}`);
