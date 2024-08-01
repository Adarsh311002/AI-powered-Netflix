import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // console.log(movies);

  return (
    <div className="px-0 md:px-4  text-white w-screen  ">
      <h1 className="md:py-4 py-2 mx-2 text-lg md:text-2xl font-semibold">{title}</h1>
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
