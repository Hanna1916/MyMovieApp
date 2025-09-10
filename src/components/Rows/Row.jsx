// // src/components/Row/Row.jsx
// import { useState, useEffect, useRef } from "react";
// import "../Rows/Row.css";
// import axios from "../Utils/axios"; 
// import YouTube from "react-youtube";

// const base_url = "https://image.tmdb.org/t/p/original/";

// function Row({ title, fetchUrl, isLargeRow = false }) {
//   const [movies, setMovies] = useState([]);
//   const rowRef = useRef(null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const request = await axios.get(fetchUrl);
//         setMovies(request.data.results || []);
//         return request;
//       } catch (err) {
//         console.error("Row fetch error:", err);
//       }
//     }
//     fetchData();
//   }, [fetchUrl]);

//   const scroll = (dir = "right") => {
//     const container = rowRef.current;
//     if (!container) return;
//     const scrollAmount = window.innerWidth / 2;
//     container.scrollBy({
//       left: dir === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="row">
//       <h2 className="row__title">{title}</h2>

//       <div className="row__scrollControls">
//         <button className="row__arrow left" onClick={() => scroll("left")}>
//           &lt;
//         </button>
//         <button className="row__arrow right" onClick={() => scroll("right")}>
//           &gt;
//         </button>
//       </div>

//       <div className="row_posters" ref={rowRef}>
//         {movies.map((movie) => {
//           const imagePath = isLargeRow
//             ? movie.poster_path
//             : movie.backdrop_path || movie.poster_path;
//           if (!imagePath) return null;
//           return (
//             <img
//               key={movie.id}
//               className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
//               src={`${base_url}${imagePath}`}
//               alt={movie.name || movie.title || movie.original_name}
//               loading="lazy"
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Row;
// src/components/Row/Row.jsx
import { useState, useEffect, useRef } from "react";
import "../Rows/Row.css";
import axios from "../Utils/axios"; 
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";   // NEW

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");   
  const rowRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results || []);
        return request;
      } catch (err) {
        console.error("Row fetch error:", err);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const scroll = (dir = "right") => {
    const container = rowRef.current;
    if (!container) return;
    const scrollAmount = window.innerWidth / 2;
    container.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Handle poster click → search for trailer
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl(""); // close if already open
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          if (!url) return;
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v")); // extract YouTube videoId
        })
        .catch((error) => console.error("Trailer not found:", error));
    }
  };

  // Options for YouTube player
  const opts = {
    height: "390",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>

      <div className="row__scrollControls">
        <button className="row__arrow left" onClick={() => scroll("left")}>
          &lt;
        </button>
        <button className="row__arrow right" onClick={() => scroll("right")}>
          &gt;
        </button>
      </div>

      <div className="row_posters" ref={rowRef}>
        {movies.map((movie) => {
          const imagePath = isLargeRow
            ? movie.poster_path
            : movie.backdrop_path || movie.poster_path;
          if (!imagePath) return null;
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}   // click loads trailer
              className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
              src={`${base_url}${imagePath}`}
              alt={movie.name || movie.title || movie.original_name}
              loading="lazy"
            />
          );
        })}
      </div>

      {/* Show YouTube trailer if trailerUrl is set */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
