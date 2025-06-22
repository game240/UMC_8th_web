import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
}
const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-60">
        <p className="text-center font-bold text-gray-500">
          영화가 존재하지 않습니다.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
