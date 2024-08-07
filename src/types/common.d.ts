type FetchError = {
  message?: string;
  code?: number;
} | null;

type Meta = {
  page: number;
  perPage: number;
  totalPage: number;
  totalData: number;
};
