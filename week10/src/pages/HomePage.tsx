import { useCallback, useMemo, useState } from "react";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";
import MovieFilter from "../components/MovieFilter";

const HomePage = () => {
  const [filter, setFilter] = useState<MovieFilters>({
    query: "",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(() => {
    return {
      params: filter,
    };
  }, [filter]);

  const { data, loading, error } = useFetch<MovieResponse>("/search/movie", {
    ...axiosRequestConfig,
  });

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilter(filters);
    },
    [setFilter]
  );

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="w-full">
      <MovieFilter onChange={handleMovieFilters} />
      {loading ? <p>Loading...</p> : <MovieList movies={data?.results || []} />}
    </main>
  );
};

export default HomePage;
