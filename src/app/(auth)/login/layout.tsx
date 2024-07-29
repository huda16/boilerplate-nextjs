import { RecaptchaProvider } from "@/providers/recaptcha-provider";

type LoginLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <RecaptchaProvider>{children}</RecaptchaProvider>;
}
