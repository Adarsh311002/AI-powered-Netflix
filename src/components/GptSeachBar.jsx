import React, { useRef } from "react";
import lang from "../utils/LanguageConstants";
import { useDispatch, useSelector } from "react-redux";

import { options } from "../utils/constants";
import groq from "../utils/OpenAi";
import { addGptMovie } from "../utils/GPTSlice";

const GptSeachBar = () => {
  const Slang = useSelector((store) => store.lang.lang);
  const text = useRef(null);
  const dispatch = useDispatch();

  const searchMoviesTmdb = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', options)

    const json = await data.json()

    return json.results;
  }

  const handleGptSearch = async () => {
    console.log(text.current.value);

    // try {
    //   const GptQuery =
    //     "Based on the" +
    //     text.current.value +
    //     "about action-packed and thrilling experiences, recommend 5 movies in a simple way, separated by commas.";

    //   const chatCompletion = await client.chat.completions.create({
    //     messages: [{ role: "user", content: GptQuery }],
    //     model: "gpt-3.5-turbo",
    //   });

    //   console.log(chatCompletion.choices);
    // } catch (error) {
    //   console.error("Error during API request:", error);
    // }

    
      const GptQuery =

      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      text.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead and just give me the results nothing more, Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

       

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: GptQuery,
          },
        ],
        model: "llama3-8b-8192",
      });

      console.log(chatCompletion.choices?.[0]?.message?.content);
   

    const gptMovies = chatCompletion.choices?.[0]?.message?.content.split(",");

    const promiseArray = gptMovies.map((movie) => searchMoviesTmdb(movie))

    const tmdbResults = await Promise.all(promiseArray)
    console.log(tmdbResults)

    dispatch(addGptMovie({movieNames :gptMovies, movieResults : tmdbResults }))
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center px-4">
      <form
        className="w-screen md:w-1/2 bg-black  grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={text}
          type="text"
          placeholder={lang[Slang].gptSearchPlaceholder}
          className="md:p-4 p-3 m-2 md:m-3 col-span-8 md:col-span-9"
        />
        <button
          className="text-white bg-red-500 px-4 m-2 md:m-3 rounded md:rounded-none font-bold col-span-4 md:col-span-3"
          onClick={handleGptSearch}
        >
          {lang[Slang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSeachBar;
