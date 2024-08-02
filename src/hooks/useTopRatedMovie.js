import { useDispatch, useSelector } from "react-redux";
import { options } from "../utils/constants";
import { useEffect } from "react";
import { addTopRatedMovies } from "../utils/movieSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const nowTopRatedMovies = useSelector((store) => store.movies.topRatedMovies);

  const getTopRatedMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    const json = await data.json();
    // console.log(json);
    dispatch(addTopRatedMovies(json.results));
  };

  useEffect(() => {
    !nowTopRatedMovies && getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
