import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import Compressor from "compressorjs";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  /* used fetcurl again so useeffect understands that something
  changed and it needs to render again*/

  //opens another tab to preview the trailer

  function trailerPlay(title) {
    const youtubeUrl = `https://www.youtube.com/results?search_query=${title}`;
    window.open(youtubeUrl, "_blank");
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => trailerPlay(movie.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
