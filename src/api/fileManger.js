// import urlcat from 'urlcat';
import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function uploadImage(data) {
  const formData = new FormData();
  formData.append('files', data);
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data: formData,
    url: urlConfig.UPLOAD_IMAGE,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}

export async function getImage(data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: urlConfig.UPLOAD_IMAGE,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  return resp.data;
}
