/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import axios, { type CancelToken } from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_API_URL
    : process.env.LOCAL_API_URL;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

interface AxiosServiceParams {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
  cancelToken?: CancelToken;
}

interface AxiosServiceResponse<T> {
  status: number;
  data: T;
  message: string;
}

/**
 * Function that handles axios requests
 * @param {AxiosServiceParams} params - an object containing the parameters for the axios request
 * @returns {Promise<AxiosServiceResponse<T>>} - a promise that resolves to an object with the status,
 * data, and message of the axios response
 */
export async function axiosService<T>({
  method,
  url,
  headers,
  body,
  cancelToken,
}: AxiosServiceParams): Promise<AxiosServiceResponse<T>> {
  try {
    const res = await instance({
      method,
      url,
      headers,
      data: body,
      cancelToken,
    });
    return {
      status: res.status,
      data: res.data as T,
      message: res.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status ?? 500,
        data: error.response?.data as T,
        message: error.response?.data.message,
      };
    }
    return {
      status: 500,
      data: null as unknown as T,
      message: 'Internal server error. Something went wrong',
    };
  }
}
