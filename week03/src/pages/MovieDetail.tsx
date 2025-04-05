import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CreditsResponse, MovieDetailResponse } from "../types/movie";
import MovieDetailCredit from "../components/MovieDetailCredit";
import Loading from "../components/Loading";

const MovieDetail = () => {
  const [data, setData] = useState<MovieDetailResponse | null>(null);
  const [creditData, setCreditData] = useState<CreditsResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!id) {
        return;
      }

      try {
        const { data } = await axios.get<MovieDetailResponse>(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
            },
          }
        );
        setData(data);
      } catch {
        setError(true);
      }
    };

    const fetchMovieCredits = async () => {
      if (!id) {
        return;
      }
      try {
        const { data } = await axios.get<CreditsResponse>(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
            },
          }
        );
        setCreditData(data);
      } catch {
        setError(true);
      }
    };

    setLoading(true);
    fetchMovieDetail();
    fetchMovieCredits();
    setLoading(false);
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error occurred</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="">
      <section
        className="flex flex-col justify-between text-white mb-4"
        style={{ height: "fit-content" }}
      >
        <div className="relative">
          <img
            className="absolute w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
            alt=""
          />
          <div className="absolute w-full h-full bg-gradient-to-r from-black to-transparent"></div>

          <div className="relative flex flex-col gap-5 z-10 w-2/4">
            <p className="text-3xl font-bold">{data?.original_title}</p>
            <div>
              <p>평균 {data?.vote_average}</p>
              <p>{data?.release_date ? data.release_date.slice(0, 4) : ""}</p>
              <p>{data?.runtime}분</p>
            </div>

            <p className="font-sans italic">{data?.tagline}</p>
            <p>{data?.overview}</p>
          </div>
          <hr className="relative border-white mt-4 w-1/4 z-20" />
        </div>
      </section>

      <section>
        <p className="mb-4 text-2xl font-bold text-white">감독/출연</p>
        <div className="grid gap-4 grid-cols-8">
          {creditData?.crew.map((crew, index) => {
            return <MovieDetailCredit data={crew} index={index} />;
          })}
          {creditData?.cast.map((cast, index) => {
            return <MovieDetailCredit data={cast} index={index} />;
          })}
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;
