import { getSession, signIn, signOut } from "next-auth/react";

import axios, { AxiosRequestConfig } from "axios";

interface RetryQueueItem {
  resolve: (_value?: any) => void;
  reject: (_error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];

let isRefreshing = false;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session && session.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        const session = await getSession();

        if (session) {
          try {
            const response = await instance.put(
              "authentications",
              {
                refreshToken: session.refreshToken,
              },
              { isSkipAuth: true },
            );

            await signIn("credentials", {
              ...response.data?.data,
              redirect: false,
            });

            instance.defaults.headers.common["Authorization"] =
              `Bearer ${response.data?.data?.accessToken}`;

            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              instance
                .request(config)
                .then((response) => {
                  resolve(response);
                })
                .catch((err) => {
                  reject(err);
                });
            });

            refreshAndRetryQueue.length = 0;

            return instance(originalRequest);
          } catch (refreshError) {
            signOut({ callbackUrl: "/signedout" });
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }
      }
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({
          config: originalRequest,
          resolve,
          reject,
        });
      });
    }
    return Promise.reject(error);
  },
);

export default instance;
