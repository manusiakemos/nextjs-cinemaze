import KitButton from "./kit-button";
import React from "react";
import { useRouter } from "next/router";

const MovieCard = ({ movie, onClick }) => {
  const router = useRouter();

  const [showPlayButton, setshowPlayButton] = React.useState();

  const handleClick = () => {
    router.push(`/movies/watch/${movie.movie_id}`);
  };

  const handleHover = () => {
    setshowPlayButton(!showPlayButton);
  };

  let textColor = "bg-green-300 text-green-700";

  if (movie.imdb < 5) {
    textColor = "bg-red-300 text-red-700";
  } else if (movie.imdb < 7 && movie.imdb > 5) {
    textColor = "bg-yellow-300 text-yellow-700";
  }

  let classNameRating = [
    textColor,
    "rounded-bl-xl font-semibold text-sm tracking-wider uppercase text-sm",
    "absolute right-0 top-0 px-2 py-2",
  ].join(" ");

  let classNameBg = [
    "relative rounded-lg overflow-clip aspect-auto bg-cover bg-center w-full aspect-[9/14]",
    "shadow-lg shadow-warning-100/30 hover:shadow-primary-500/70",
  ].join(" ");

  let classNameContainer = [
    "absolute inset-0 w-full py-2 px-4 flex items-center justify-center flex-col backdrop-filter backdrop-sepia-0 bg-gradient-to-t from-black/70 hover:from-black/30 h-full cursor-pointer",
  ].join(" ");

  function playButton() {
    if (showPlayButton) {
      return (
        <div>
          <KitButton
            variant="circle"
            className="flex items-center justify-center bg-primary-500/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                className="fill-white"
                d="M19.376 12.416L8.777 19.482A.5.5 0 0 1 8 19.066V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832z"
              />
            </svg>
          </KitButton>
        </div>
      );
    }
  }

  return (
    <div
      style={{ backgroundImage: `url('${movie.poster}')` }}
      className={classNameBg}
      onClick={onClick}
    >
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={handleClick}
        className={classNameContainer}
      >
        <div className="absolute bottom-0 px-4 py-3">
          <div className="font-normal text-sm tracking-wider text-gray-100">
            {movie.title} {movie.year}
          </div>
        </div>
        <div className={classNameRating}> {movie.imdb}</div>
        {playButton()}
      </div>
    </div>
  );
};

export default MovieCard;
