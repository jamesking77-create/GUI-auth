import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import im1 from "../asset/avatar-the-way-of-water-movie-poster.jpg";
import im2 from "../asset/disney-pirates-of-the-caribbean-at-world-s-end-dvd-one-sheet_u-L-Q1RG0M40.jpg";
import im5 from "../asset/p_johncarter_19880_db4d22d7.jpeg";
import im3 from "../asset/spectre-theatrical-movie-poster.jpg";
import im6 from "../asset/spider-man-spider-man-3-wallpaper-preview.jpg";
import im7 from "../asset/tangled-movie-poster.jpg";
import im4 from "../asset/the-dark-knight-rises-movie-poster.jpg";
import "../styles/swiperTest.css";
function SwiperTest() {
  return (
    <div className="bod">
      <div className="swiper-slide">
        <span>
          <div className="overviews">
            <p>
              In the 22nd century, a paraplegic Marine is dispatched to the moon
              Pandora on a unique mission, but becomes torn between following
              orders and protecting an alien civilization.
            </p>
          </div>
          <div className="found"> 
          <img src={im4} alt=""  />
          </div>
        </span>
      </div>
    </div>
  );
}

export default SwiperTest;
