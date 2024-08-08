/* eslint-disable no-unused-vars */
namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    API_BASE_URL: string;
    API_USERNAME: string;
    API_PASSWORD: string;

    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_RECAPTCHA_KEY: string;
  }
}
