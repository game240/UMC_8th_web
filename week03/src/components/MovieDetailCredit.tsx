import { Cast, Crew } from "../types/movie";

interface MovieDetailCreditProps {
  data: Cast | Crew;
  index: number;
}

const MovieDetailCredit: React.FC<MovieDetailCreditProps> = ({ data, index }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        key={index}
        className="w-24 h-24 border border-white rounded-full bg-cover bg-no-repeat mb-2"
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/original${data.profile_path})`,
        }}
      ></div>
      <p className="text-sm font-bold text-center text-white">{data.original_name}</p>
      <p className="text-xs text-center text-white">{"job" in data ? data.job : data.character}</p>
    </div>
  );
};

export default MovieDetailCredit;
