import { useState } from "react";
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

  const { data, loading, error } = useFetch<MovieResponse>("/search/movie", {
    params: filter,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="w-full">
      <MovieFilter onChange={setFilter} />
      <MovieList movies={data?.results || []} />
    </main>
  );
};

export default HomePage;
