import React from "react";
import { Dialog, IconButton, Button, Divider, Rating } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { type Movie } from "../types/movie";

interface MovieModalProps {
  open: boolean;
  onClose: () => void;
  movie: Movie | null;
}

const MovieModal: React.FC<MovieModalProps> = ({ open, onClose, movie }) => {
  const imgUrl = "https://image.tmdb.org/t/p/w500" + movie?.poster_path;
  const backdropImgUrl =
    "https://image.tmdb.org/t/p/w500" + movie?.backdrop_path;

  if (!movie) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        className: "overflow-hidden",
      }}
    >
      <div
        className="h-48 bg-cover bg-center relative bg-gray-900 text-white"
        style={{ backgroundImage: `url(${backdropImgUrl})` }}
      >
        <IconButton
          className="absolute right-2 top-2 text-white"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <div className="flex p-6 gap-6">
        <img
          src={imgUrl}
          alt={movie.title}
          className="w-48 h-72 object-cover rounded-lg"
        />

        <div className="flex-1 flex flex-col gap-3">
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>

          <p className="text-gray-600">{movie.original_title}</p>

          <div className="flex items-center gap-2 my-2">
            <Rating value={movie.vote_average / 2} precision={0.1} readOnly />
            <span className="text-base">
              {movie.vote_average.toFixed(1)} ({movie.vote_count} 평점)
            </span>
          </div>

          <Divider />

          <div>
            <p className="text-sm text-gray-500">개봉일</p>
            <p className="mb-2">
              {new Date(movie.release_date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">인기도</p>
            <p>{movie.popularity.toFixed(1)}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">줄거리</p>
            <p>{movie.overview || "줄거리 정보가 없습니다."}</p>
          </div>

          <div className="flex gap-3 mt-auto pt-4">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                window.open(`https://www.imdb.com/title/${movie.id}`, "_blank")
              }
              disabled={!movie.id}
              className="bg-blue-600 hover:bg-blue-700"
            >
              IMDB에서 검색
            </Button>
            <Button
              variant="outlined"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              닫기
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MovieModal;
