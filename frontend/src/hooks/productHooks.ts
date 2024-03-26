import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";
import { useState, useEffect } from "react";
import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";

export const useGetProductsQuery = (page = 1, pageSize = 10, query = "") => {
  // Correctly structuring the query key and query function within the options object
  return useQuery({
    queryKey: ["products", page, pageSize, query],
    queryFn: async () => {
      const queryString = `/api/products?page=${page}&pageSize=${pageSize}${
        query ? `&query=${encodeURIComponent(query)}` : ""
      }`;
      const response = await axios.get(queryString);
      return response.data;
    },
    // keepPreviousData: true, // Optionally keep previously fetched data while new data is loading
  });
};

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
  });

export function useFetchProducts(query: string | null) {
  const [data, setData] = useState<ApiResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/products?query=${query}`
        );
        setData(response.data);
      } catch (err) {
        setError("An error occurred while fetching the products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query]);

  return { data, loading, error };
}

export const useGetFilteredProductsQuery = (filters = {}) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      const response = await axios.get(
        `/api/products/filtered/${queryParams}${filters}`
      );
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });
};
