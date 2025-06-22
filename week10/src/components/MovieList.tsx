import type { Movie } from "../types/movie";

interface MovieListProps {
  movies: Movie[];
}
const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
