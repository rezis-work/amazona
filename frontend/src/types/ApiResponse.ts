import { Product } from "./Product";

export type ApiResponse = {
  products: Product[];
  page: number;
  pageSize: number;
  totalPages: number;
};
