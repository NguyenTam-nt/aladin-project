import { createRequest } from 'src/api/core';
import { baseUrl, timeout } from './config';

const request = createRequest(baseUrl, timeout);

export default request;
