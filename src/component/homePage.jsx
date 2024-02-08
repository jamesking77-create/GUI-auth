import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import '../styles/homepage.css';


import im1 from "../asset/avatar-the-way-of-water-movie-poster.jpg"
import im2 from "../asset/disney-pirates-of-the-caribbean-at-world-s-end-dvd-one-sheet_u-L-Q1RG0M40.jpg"
import im5 from "../asset/p_johncarter_19880_db4d22d7.jpeg"
import im3 from "../asset/spectre-theatrical-movie-poster.jpg"
import im6 from "../asset/spider-man-spider-man-3-wallpaper-preview.jpg"
import im7 from "../asset/tangled-movie-poster.jpg"
import im4 from "../asset/the-dark-knight-rises-movie-poster.jpg";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [matchingMovies, setMatchingMovies] = useState([]);
  const [viewMode, setViewMode] = useState('recommended'); 
  const [loading, setLoading] = useState(false);
  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Sci-Fi',
    'Thriller',
    'Romance',
    'Mystery',
    'Crime',
    'Animation',
    'Family',
    'Documentary',
    'Biography',
    'History',
    'Music',
    'Musical',
    'Western',
    'War',
    'Sport',
    'Superhero',
    'Spy',
    'Psychological',
    'Fantasy',
    'Fiction',
    'Science',
    'Political',
    'Paranormal',
    'Teen'
  ];
  

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://mrs-ax3k.onrender.com/display_movies');
        setMovies(response.data.movies);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = async (title, id) => {
    setLoading(true); 
    try {
      const response = await axios.post('https://mrs-ax3k.onrender.com/recommend_movies', {
        title,
        id
      });
      setMatchingMovies(response.data.recommended_movies);
      setViewMode('recommended');
      setLoading(false); 
      console.log('Recommendation response:', response.data);
    } catch (error) {
      console.error('Error recommending movies:', error);
      setLoading(false); 
    }
  };

  const handleSearch = async (query) => {
    setLoading(true); 
    try {
      const response = await axios.get(`https://mrs-ax3k.onrender.com/search?query=${query}`);
      setMatchingMovies(response.data.matching_movies);
      setViewMode('genre');
      setLoading(false); 
      console.log(response.data.matching_movies);
    } catch (error) {
      console.error('Error searching movies:', error);
      setLoading(false); 
    }
  };


  const handleGenreClick = async (genre) => {
    setLoading(true); 
    try {
      const response = await axios.get(`https://mrs-ax3k.onrender.com/search?query=${genre}`);
      setMatchingMovies(response.data.matching_movies);
      setViewMode('genre');
      setLoading(false); 
      console.log(response.data.matching_movies);
    } catch (error) {
      console.error('Error searching movies:', error);
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <p className="heading">MRS</p>

      <div className="search-container">
        <input type="text" placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} />
        <button type="submit">Search</button>
      </div>

      <p className="heading1">TOP 10</p>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className='swiper_container'
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index} onClick={() => handleMovieClick(movie.title, movie.id)}>
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
          <button key={index} className="genre-button" onClick={() => handleGenreClick(genre)}>{genre}</button>
        ))}
      </div>

      <div className="recommended-movies">
        <div className="grid-container">
          {viewMode === 'recommended' && matchingMovies.map((movie, index) => (
            <div key={index} className="grid-item"><p>{movie.title}</p></div>
          ))}
          {viewMode === 'genre' && matchingMovies.map((movie, index) => (
            <div key={index} className="grid-item"><p>{movie.title}</p></div>
          ))}
        </div>
      </div>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div> 
        </div>
      )}
    </div>
  );
};

export default HomePage;
