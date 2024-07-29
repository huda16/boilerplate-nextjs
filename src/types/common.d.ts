type FetchError = {
  data?: {
    message?: string;
  };
} | null;

type Meta = {
  page: number;
  perPage: number;
  totalPage: number;
  totalData: number;
};
