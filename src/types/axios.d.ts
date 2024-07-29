import "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    isSkipAuth?: boolean;
  }
}
