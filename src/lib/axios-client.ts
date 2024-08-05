import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import axios, { AxiosError } from "axios";

let lastSession: Session | null = null;

const ApiClient = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  instance.interceptors.request.use(
    async (request) => {
      if (request.isSkipAuth || request.auth) {
        return request;
      }

      if (
        lastSession === null ||
        Date.now() / 1000 > lastSession.accessTokenExpiresAt
      ) {
        const session = await getSession();
        lastSession = session;
      }

      if (lastSession) {
        request.headers.Authorization = `Bearer ${lastSession.accessToken}`;
      }

      return request;
    },
    (error) => {
      console.error("AxiosInterceptors Request onRejected::", error);
      throw error;
    },
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        if (
          lastSession === null ||
          Date.now() / 1000 > lastSession.accessTokenExpiresAt
        ) {
          const session = await getSession();
          lastSession = session;
        }

        const config = error.config;

        if (config && lastSession) {
          const bearer = `Bearer ${lastSession.accessToken}`;
          config.headers.Authorization = bearer;
          return axios.request(config);
        } else {
          console.error(
            "AxiosInterceptors Response 401:: Error config is undefined",
          );
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export default ApiClient();
