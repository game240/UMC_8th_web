import axios from "axios";
import { useEffect, useState } from "react";

import { Movie, MovieResponse } from "./../types/movie";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: "Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}",
          },
        }
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <section className="movies grid gap-4 grid-cols-6">
      {movies?.map((movie) => (
        <div
          key={movie.id}
          className="relative group bg-cover bg-center h-60 rounded-lg flex items-center justify-center cursor-pointer"
        >
          <img
            className="absolute w-full h-full rounded-lg group-hover:blur-sm transition-all duration-300"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
          />

          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 w-full h-full z-10 flex flex-col items-center justify-center cursor-default">
            <p className="text-white font-bold text-center">{movie.title}</p>
            <p className="text-white text-center line-clamp-3">{movie.overview}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MoviesPage;
