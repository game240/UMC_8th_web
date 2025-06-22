import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieResponse } from "../types/movie";

const HomePage = () => {
  const { data, loading, error } = useFetch<MovieResponse>("/search/movie", {
    params: {
      query: "코난",
      include_adult: false,
      language: "ko-KR",
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <main className="w-full">
      <MovieList movies={data?.results || []} />
    </main>
  );
};

export default HomePage;
