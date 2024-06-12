// import urlcat from 'urlcat';
import axios from 'axios';
import * as urlConfig from './urlConfig';
import { getToken } from '../services/storages/userStorage';

export async function getListCompanion() {
  const token = getToken();
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_COMPANION,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function createCompanion(data) {
  const token = getToken();
  const resp = await axios({
    method: 'POST',
    data,
    url: urlConfig.CREATE_COMPANION,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function updateCompanion(id,data) {
  const token = getToken();
  const resp = await axios({
    method: 'PUT',
    data,
    url: urlConfig.UPDATE_COMPANION+`/${id}`,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function deleteCompanion(id) {
  const token = getToken();
  const resp = await axios({
    method: 'DELETE',
    url: urlConfig.DELETE_COMPANION+`/${id}`,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function handelCensor(data) {
  const token = getToken();
  console.log(`object token`, token);
  const resp = await axios({
    method: 'PUT',
    url: urlConfig.PUT_KIEMDUYET,
    data,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function getPolicy() {
  const token = getToken();
  console.log(`object token`, token);
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_POLICY,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });
  return resp.data.data;
}

export async function createPolicy(data) {
  const token = getToken();
  console.log(`object token`, token);
  const resp = await axios({
    method: 'POST',
    url: urlConfig.CREATE_POLICY,
    data,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function updatePolicy(id,data) {
  const token = getToken();
  console.log(`object token`, token);
  const resp = await axios({
    method: 'PUT',
    url: urlConfig.UPDATE_POLICY+`/${id}`,
    data,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function changeStatusPolicy(data) {
  const token = getToken();
  console.log(`object token`, token);
  const resp = await axios({
    method: 'POST',
    url: urlConfig.CHANGE_POLICY_STATUS,
    data,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}


export async function getPolicyByid(id) {
  const token = getToken();
  console.log(`object token`, token);
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_POLICY_BYID+`/${id}`,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function getListProvince() {
  const token = getToken();
  console.log(`object token`, token);
  const resp = await axios({
    method: 'GET',
    url: urlConfig.GET_PROVINCE,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}

export async function changeIconProvince(id,data) {
  const token = getToken();
  console.log(`object token`, token);
  const resp = await axios({
    method: 'PUT',
    url: urlConfig.GET_PROVINCE+`/${id}`,
    data,
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  return resp.data.data;
}
