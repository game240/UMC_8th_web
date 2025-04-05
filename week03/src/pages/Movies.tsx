import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import PageBtn from "../components/PageBtn";

import { Category, Movie, MovieResponse } from "./../types/movie";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams<{ category: Category }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
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
        <p className="text-gray-300">{page} 페이지</p>
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
            className="relative group bg-cover bg-center h-60 rounded-lg flex items-center justify-center"
          >
            {/* 클릭용 더미 버튼 추가 */}
            <button
              className="absolute w-full h-full z-20 cursor-pointer"
              onClick={() => {
                navigate(`/movies/detail/${movie.id}`);
              }}
            ></button>
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
