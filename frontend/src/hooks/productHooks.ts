import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";
import { useState, useEffect } from "react";
import axios from "axios";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => (await apiClient.get<Product[]>(`api/products`)).data,
  });

export const useGetProductDetailsBySlugQuery = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/slug/${slug}`)).data,
  });

export function useFetchProducts(query: string | null) {
  const [data, setData] = useState<Product[]>([]);
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
