import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Herosection.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
 function SecondSlide(){
  return <>
  <div class="container2">
<div class="row">
  <div class="col-12">
    <article class="blog-card">
      <div class="blog-card__background" style={{ backgroundImage: "url(/Menimage.jpeg)" , backgroundRepeat: "no-repeat",backgroundSize: '100%'}}>
        <div class="card__background--wrapper">
          <div class="card__background--main">
            <div class="card__background--layer"></div>
          </div>
        </div>
      </div>
      <div class="blog-card__head">
        
      </div>
      
    </article>
  </div>
</div>
</div>
  </>
 }
 function FirstSlide(){
  return <>
  <div class="container2">
<div class="row">
  <div class="col-12">
    <article class="blog-card">
      <div class="blog-card__background" style={{ backgroundImage: "url(/saleImage.jpeg)" , backgroundRepeat: "no-repeat",backgroundSize: '100%'}}>
        <div class="card__background--wrapper">
          <div class="card__background--main">
            <div class="card__background--layer"></div>
          </div>
        </div>
      </div>
      <div class="blog-card__head">
        
      </div>
      
    </article>
  </div>
</div>
</div>
  </>
 }
 function ThirdSlide(){
  return <>
  <div class="container2">
<div class="row">
  <div class="col-12">
    <article class="blog-card">
      <div class="blog-card__background" style={{ backgroundImage: "url(/dummyImage.jpeg)" , backgroundRepeat: "no-repeat",backgroundSize: '100%'}}>
        <div class="card__background--wrapper">
          <div class="card__background--main">
            <div class="card__background--layer"></div>
          </div>
        </div>
      </div>
      <div class="blog-card__head">
        
      </div>
      
    </article>
  </div>
</div>
</div>
  </>
 }
  
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><FirstSlide/></SwiperSlide>
        <SwiperSlide><SecondSlide/></SwiperSlide>
        <SwiperSlide><ThirdSlide/></SwiperSlide>
       
      </Swiper>
    </>
  );
}