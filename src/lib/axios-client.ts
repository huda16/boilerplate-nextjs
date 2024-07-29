import { Session } from "next-auth";
import { getSession } from "next-auth/react";

import axios from "axios";

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
        Date.now() > Date.parse(lastSession.accessTokenExpiresAt)
      ) {
        const session = await getSession();
        lastSession = session;
      }

      if (lastSession) {
        request.headers.Authorization = `Bearer ${lastSession.accessToken}`;
        request.headers.apikey = process.env.NEXT_PUBLIC_API_KEY;
      }

      return request;
    },
    (error) => {
      console.error("AxiosInterceptors::", error);
      throw error;
    },
  );

  return instance;
};

export default ApiClient();
