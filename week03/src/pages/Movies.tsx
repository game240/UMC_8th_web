import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/Loading";
import PageBtn from "../components/PageBtn";

import { Category, Movie, MovieResponse } from "./../types/movie";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams<{ category: Category }>();

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZTE4YmRhOWZlZDk4NjRhY2YyYTQ2N2I3YzM4YmY4OSIsIm5iZiI6MTc0MzQ4MjM1NS44MzgsInN1YiI6IjY3ZWI2ZGYzYjBhOWFjNzQxNThiZThmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ztseE0n6bFTVAkH3MypMnwokoVGh9IkTcdl6nKkmUpI",
          },
        }
      );

      setMovies(data.results);
    };

    try {
      setLoading(true);
      fetchMovies();
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [params, page]);

  if (error) {
    return <div className="text-red-500">Error occurred</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4 mb-8">
        <PageBtn
          className={page !== 1 ? "bg-purple-300" : "bg-gray-300"}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          {"<"}
        </PageBtn>
        <p>{page} 페이지</p>
        <PageBtn
          className="bg-green-300"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {">"}
        </PageBtn>
      </div>
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
    </>
  );
};

export default Movies;
