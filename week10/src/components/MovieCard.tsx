import clsx from "clsx";
import type { Movie } from "../types/movie";
import { useState } from "react";
import MovieModal from "./MovieModal";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [open, setOpen] = useState(false);

  const imgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const fallbackImgUrl = "https://via.placeholder.com/640x480";
  return (
    <>
      <MovieModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        movie={movie}
      />
      <div
        className="overflow-hidden rounded-lg bg-white shadow-md transition-all cursor-pointer hover:shadow-lg"
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="relative overflow-hidden h-80">
          <img
            src={imgUrl}
            alt={clsx(movie.title, "포스터")}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            onError={(error) => {
              error.currentTarget.src = fallbackImgUrl;
            }}
          />
          <div className="absolute right-2 top-2 px-2 py-1 rounded-md bg-black text-sm font-bold text-white">
            {/* 소숫점 첫째자리까지 */}
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <p className="text-sm text-gray-500">
            {movie.release_date} | {movie.original_language.toUpperCase()}
          </p>
          <p className="text-sm text-gray-500 line-clamp-6">
            {movie.overview.slice(0, 100)}...
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
