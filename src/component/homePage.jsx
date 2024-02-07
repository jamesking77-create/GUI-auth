import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation } from 'swiper';

import '../styles/homepage.css';
import im1 from "../asset/Miles Morales (1).jpeg"
import im2 from "../asset/download (7).jpeg"
import im3 from "../asset/e3bc9eff3431e928c60d9ff9cd102c0b.jpg"
import im4 from "../asset/download (8).jpeg"
import im5 from "../asset/download (9).jpeg"

const HomePage = () => {
  return (
    <div className="container">
    
      {/* Search Engine */}
      <div className="search-container">
        <input type="text" placeholder="Search..." />
        <button type="submit">Search</button>
      </div>

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
        <SwiperSlide>
          <img src={im1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={im2} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={im3} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={im4} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={im5} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={im5} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={im5} alt="slide_image" />
        </SwiperSlide>

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>

      {/* Recommended Movies */}
      <div className="recommended-movies">
        <div className="grid-container">
          {/* Top row */}
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          {/* Bottom row */}
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
          <div className="grid-item"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
