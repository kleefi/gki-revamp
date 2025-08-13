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
  const [mounted, setMounted] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted || loading)
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
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={showNavigation}
        slidesPerView={1}
        spaceBetween={30}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full">
              <Image
                src={slide.image_url}
                alt={slide.alt_text || "Slider Image"}
                priority
                width={1920}
                height={1080}
                sizes="100vw"
                className="w-full h-auto object-cover md:h-[600px]"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && mounted && (
        <>
          <button
            ref={prevRef}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-40 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors cursor-pointer"
            aria-label="Previous Slide"
          >
            <FiArrowLeft size={24} />
          </button>
          <button
            ref={nextRef}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-40 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors cursor-pointer"
            aria-label="Next Slide"
          >
            <FiArrowRight size={24} />
          </button>
        </>
      )}
    </div>
  );
}
