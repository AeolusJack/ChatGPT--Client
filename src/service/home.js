

import axios from '../utils/axios'

export function creatImage(params) {
  return axios.post('/chat/creatImage', params);
}

export function getChatText(params) {
 axios.get('/chat/getChatText', { params }).then((response) => {
    return response;
    });
}
