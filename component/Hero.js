"use client";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect, useRef } from "react";

export default function Hero() {
  const slides = [
    { id: 1, src: "/slider1.jpg", alt: "Slide 1" },
    // { id: 2, src: "/slider2.jpg", alt: "Slide 2" },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const showNavigation = slides.length > 1;

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        navigation={
          showNavigation
            ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }
            : false
        }
        onBeforeInit={(swiper) => {
          if (showNavigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        loop={showNavigation}
        pagination={false}
        slidesPerView={1}
        spaceBetween={30}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Image
              className="w-full object-cover"
              src={slide.src}
              height={800}
              width={1200}
              alt={slide.alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <button
            ref={prevRef}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-45 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Previous Slide"
          >
            <FiArrowLeft className="cursor-pointer" size={24} />
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-45 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Next Slide"
          >
            <FiArrowRight className="cursor-pointer" size={24} />
          </button>
        </>
      )}
    </div>
  );
}
