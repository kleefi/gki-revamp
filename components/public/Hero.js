"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Loading from "./Loading";

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data, error } = await supabase
          .from("sliders")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setSlides(data || []);
      } catch (err) {
        console.error("Error fetching slides:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const showNavigation = slides.length > 1;

  if (loading)
    return (
      <div className="h-screen flex mx-auto items-center justify-center">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 p-4">Error loading slides: {error}</div>
    );
  if (slides.length === 0)
    return <div className="text-gray-500 p-4">No slides available</div>;

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={
          showNavigation
            ? {
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }
            : false
        }
        autoplay={{
          delay: 5000, // 5 detik
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          if (showNavigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        loop={showNavigation}
        pagination={false}
        slidesPerView={1}
        spaceBetween={30}
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[400px] md:h-[600px]">
              <Image
                className="object-cover"
                src={slide.image_url}
                fill
                alt={slide.alt_text || "Slider Image"}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <button
            ref={prevRef}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-45 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous Slide"
            onClick={() => swiperRef.current?.autoplay?.stop()}
          >
            <FiArrowLeft className="cursor-pointer" size={24} />
          </button>

          <button
            ref={nextRef}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-45 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next Slide"
            onClick={() => swiperRef.current?.autoplay?.stop()}
          >
            <FiArrowRight className="cursor-pointer" size={24} />
          </button>
        </>
      )}
    </div>
  );
}
