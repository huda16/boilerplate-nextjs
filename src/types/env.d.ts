namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    API_BASE_URL: string;
    API_KEY: string;
    API_USERNAME: string;
    API_PASSWORD: string;

    NEXT_PUBLIC_API_BASE_URL: string;
    NEXT_PUBLIC_API_KEY: string;
    NEXT_PUBLIC_RECAPTCHA_KEY: string;
  }
}
