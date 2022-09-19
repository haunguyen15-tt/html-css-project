import { sendDelete, sendGet, sendPost, sendPut } from './axios';
import axios from 'axios'

export const create = (type, payload) => sendPost(`${type}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
export const getAll = (type, params) => sendGet(`${type}`, params);
export const update = (type, id, payload) => sendPut(`${type}/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
export const remove = (type, id) => sendDelete(`${type}/${id}`);

