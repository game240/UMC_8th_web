import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

interface ReturnType<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useFetch = <T,>(url: string, options?: object): ReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get(url, options);
        setData(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          setError(error.response?.data.message);
        } else {
          setError("데이터를 가져오는 데 에러가 발생했습니다.");
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [url, options]);

  return { data, loading, error };
};

export default useFetch;
