import { memo, useEffect, useState } from "react";
import type { MovieFilters, MovieLanguage } from "../types/movie";
import MovieInput from "./MovieInput";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  const [filter, setFilter] = useState<MovieFilters>({
    query: "",
    include_adult: false,
    language: "ko-KR",
  });

  const handleSearch = () => {
    onChange(filter);
  };

  useEffect(() => {
    onChange(filter);
  }, [onChange, filter.include_adult, filter.language]);

  return (
    <div className="transform space-y-6 rounded-2xl border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-wrap gap-6 items-center">
        <div className="min-w-[450px] flex-1">
          <MovieInput
            className="w-full rounded-lg border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search"
            value={filter.query}
            onChange={(event) => {
              setFilter({ ...filter, query: event.target.value });
            }}
          />
        </div>

        <select
          value={filter.language}
          onChange={(event) => {
            setFilter({
              ...filter,
              language: event.target.value as MovieLanguage,
            });
          }}
        >
          <option value="ko-KR">Korean</option>
          <option value="en-US">English</option>
        </select>
        <div className="flex items-center gap-2">
          성인 포함
          <input
            type="checkbox"
            checked={filter.include_adult}
            onChange={(event) => {
              setFilter({
                ...filter,
                include_adult: event.target.checked,
              });
            }}
          />
        </div>

        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default memo(MovieFilter);
