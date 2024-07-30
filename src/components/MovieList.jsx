import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log(movies);

  return (
    <div className="px-4  text-white w-screen ">
      <h1 className="py-4 mx-2 text-2xl font-semibold">{title}</h1>
      <div className="flex overflow-x-scroll " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex ">
          {movies && movies.map((movie) => (
            <MovieCard key={movie.id} posterpath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
