"use client";

// import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type RecaptchaProviderProps = {
  children: React.ReactNode;
};

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  return (
    // <GoogleReCaptchaProvider
    //   reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
    // >
    children
    // </GoogleReCaptchaProvider>
  );
}
