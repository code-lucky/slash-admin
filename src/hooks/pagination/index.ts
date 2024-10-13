import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';

type PaginationHook<T> = {
  page: number; // Renamed from currentPage
  total: number; // Renamed from totalPages
  limit: number; // Renamed from itemsPerPage
  data: PaginatedData<T>;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void; // Renamed from setCurrentPage
  nextPage: () => void;
  prevPage: () => void;
  setLimit: (items: number) => void; // Renamed from setItemsPerPage
};

interface PaginatedData<T> {
  items: T[];
  totalItems: number;
}

// Removed FetchFunction type

const usePagination = <T>(
  fetchFunction: (params: { page: number; limit: number }) => Promise<{ items: T[]; totalItems: number }>, // New parameter
  initialLimit: number = 10 // Renamed from initialItemsPerPage
): PaginationHook<T> => {
  const [page, setPage] = useState(1); // Renamed from currentPage
  const [limit, setLimit] = useState(initialLimit); // Renamed from itemsPerPage
  const [data, setData] = useState<PaginatedData<T>>({ items: [], totalItems: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = Math.ceil(data.totalItems / limit); // Renamed from totalPages

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { items, totalItems } = await fetchFunction({ page, limit }); // Use fetchFunction
        setData({
          items,
          totalItems,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction, page, limit]); // Updated dependencies

  const nextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, total));
  };

  const prevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    page, // Renamed from currentPage
    total, // Renamed from totalPages
    limit, // Renamed from itemsPerPage
    data,
    loading,
    error,
    setPage, // Renamed from setCurrentPage
    nextPage,
    prevPage,
    setLimit, // Renamed from setItemsPerPage
  };
};

export default usePagination;