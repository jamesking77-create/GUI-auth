import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import "../styles/homepage.css";
import { BASE_URL } from "../../baseUrl";

import im1 from "../asset/avatar-the-way-of-water-movie-poster.jpg";
import im2 from "../asset/disney-pirates-of-the-caribbean-at-world-s-end-dvd-one-sheet_u-L-Q1RG0M40.jpg";
import im5 from "../asset/p_johncarter_19880_db4d22d7.jpeg";
import im3 from "../asset/spectre-theatrical-movie-poster.jpg";
import im6 from "../asset/spider-man-spider-man-3-wallpaper-preview.jpg";
import im7 from "../asset/tangled-movie-poster.jpg";
import im4 from "../asset/the-dark-knight-rises-movie-poster.jpg";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [matchingMovies, setMatchingMovies] = useState([]);
  const [viewMode, setViewMode] = useState("recommended");
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Sci-Fi",
    "Thriller",
    "Romance",
    "Mystery",
    "Crime",
    "Animation",
    "Family",
    "Documentary",
    "Biography",
    "History",
    "Music",
    "Musical",
    "Western",
    "War",
    "Sport",
    "Superhero",
    "Spy",
    "Psychological",
    "Fantasy",
    "Fiction",
    "Science",
    "Political",
    "Paranormal",
    "Teen",
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/display_movies`);
        const moviesWithRating = response.data.movies.map((movie) => ({
          ...movie,
          rating: 0,
        }));
        setMovies(moviesWithRating);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      setRating(selectedMovie.rating);
    }
  }, [selectedMovie]);

  const handleMovieClick = async (title, id) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/recommend_movies`, {
        title,
        id,
      });
      setMatchingMovies(response.data.recommended_movies);
      setViewMode("recommended");
    } catch (error) {
      console.error("Error recommending movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const movieResponse = await axios.get(
        `${BASE_URL}/search_movies?query=${searchQuery}`
      );
      if (movieResponse.data.matching_movies.length > 0) {
        setMatchingMovies(movieResponse.data.matching_movies);
        setViewMode("genre");
        return;
      }

      const creditResponse = await axios.get(
        `${BASE_URL}/search_credits?query=${searchQuery}`
      );
      setMatchingMovies(creditResponse.data.matching_credits);

      setViewMode("genre");
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = async (genre) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/search_movies?query=${genre}`
      );
      setMatchingMovies(response.data.matching_movies);
      setViewMode("genre");
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGridItemClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  const handleRatingChange = (value) => {
    setRating(value);
    setSelectedMovie((prevMovie) => ({ ...prevMovie, rating: value }));
  };

  const saveRating = async () => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/update_rating`, {
        id: selectedMovie.id,
        rating: rating,
      });

      const updatedMovies = movies.map((movie) => {
        if (movie.id === selectedMovie.id) {
          return { ...movie, vote_average: rating };
        }
        return movie;
      });
      setMovies(updatedMovies);
      setLoading(false);
      
      handleClosePopup();
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

  return (
    <div className="container">
      <p className="heading">MRS</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <p className="heading1">TOP 10</p>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        {movies.map((movie, index) => (
          <SwiperSlide
            key={index}
            onClick={() => handleMovieClick(movie.title, movie.id)}
          >
            {index === 0 && <img src={im1} alt="slide_image" />}
            {index === 1 && <img src={im2} alt="slide_image" />}
            {index === 2 && <img src={im3} alt="slide_image" />}
            {index === 3 && <img src={im4} alt="slide_image" />}
            {index === 4 && <img src={im5} alt="slide_image" />}
            {index === 5 && <img src={im6} alt="slide_image" />}
            {index === 6 && <img src={im7} alt="slide_image" />}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">
          <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        <div className="swiper-button-next slider-arrow">
          <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
        <div className="swiper-pagination"></div>
      </div>

      <div className="genres-container">
        {genres.map((genre, index) => (
          <button
            key={index}
            className="genre-button"
            onClick={() => handleGenreClick(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="recommended-movies">
  <div className="grid-container">
    {viewMode === 'recommended' && matchingMovies.map((movie, index) => (
      <div key={index} className="grid-item" onClick={() => handleGridItemClick(movie)}>
        <p>{movie.vote_average ? movie.title : `${movie.title}`}<br /><br />{movie.vote_average ? movie.vote_average : ''} ★</p>
      </div>
    ))}
    {viewMode === 'genre' && matchingMovies.map((movie, index) => (
      <div key={index} className="grid-item" onClick={() => handleGridItemClick(movie)}>
        <p>{movie.vote_average ? movie.title : `${movie.title}`}<br /><br />{movie.vote_average ? movie.vote_average: ''} ★</p>
      </div>
    ))}
  </div>
</div>

      {selectedMovie && (
        <div className="popup-container">
          <div className="popup">
            <p>
              Rate:{" "}
              <span style={{ color: "gold", fontWeight: "bolder" }}>
                {" "}
                {selectedMovie.title}{" "}
              </span>
            </p>
            <div className="ratings">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={i < rating ? "filled" : ""}
                  onClick={() => handleRatingChange(i + 1)}
                >
                  ★
                </span>
              ))}
            </div>
            <button onClick={saveRating}>Save Rating</button>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
