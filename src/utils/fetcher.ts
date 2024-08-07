import { AxiosError, AxiosRequestConfig, Method } from "axios";

import axios from "@/lib/axios-client";

type Params = Record<string, any>;

type FetchData = AxiosRequestConfig & {
  url: string;
  method?: Method;
  params?: Params;
};

type DownloadData = FetchData & {
  filename: string;
  format?: string | "PREDEFINED";
};

type Meta = {
  current_page?: number;
  limit?: number;
  total?: number;
};

type CommonResponse<R> = {
  data: R;
  message: string;
  status: string;
  meta: Meta;
};

// type CommonResponse<R> = R;

export const fetchData = async <R>({
  url,
  method,
  params,
  ...rest
}: FetchData): Promise<CommonResponse<R>> => {
  try {
    const response = await axios.request<CommonResponse<R>>({
      url,
      method,
      params,
      ...rest,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<CommonResponse<R>>;
    throw axiosError.response?.data ?? error;
  }
};

export const downloadData = async <R>({
  url,
  method,
  responseType = "blob",
  params,
  data,
  filename,
  format = "xlsx",
  ...rest
}: DownloadData) => {
  try {
    const response = await axios.request<Blob>({
      url,
      method,
      responseType,
      params,
      data,
      ...rest,
    });
    const href = window.URL.createObjectURL(response.data);

    const anchorElement = document.createElement("a");

    anchorElement.href = href;
    if (format === "PREDEFINED") {
      anchorElement.download = filename;
    } else {
      anchorElement.download = `${filename}.${format}`;
    }

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);

    return new Blob([response.data]);
  } catch (error) {
    const axiosError = error as AxiosError<CommonResponse<R>>;
    throw axiosError.response?.data ?? error;
  }
};
