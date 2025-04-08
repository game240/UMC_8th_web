import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

function useApiRequest<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
          },
        });

        setData(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url]);

  return { data, loading, error };
}

export default useApiRequest;
