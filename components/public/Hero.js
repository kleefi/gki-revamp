"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Slider from "react-slick";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import Loading from "./Loading";

export default function Hero() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="h-screen flex mx-auto items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">Error loading slides: {error}</div>
    );
  }

  if (slides.length === 0) {
    return <div className="text-gray-500 p-4">No slides available</div>;
  }

  const settings = {
    dots: false,
    infinite: slides.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
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
        ))}
      </Slider>
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors cursor-pointer"
    >
      <FiArrowLeft size={24} />
    </button>
  );
}

function NextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors cursor-pointer"
    >
      <FiArrowRight size={24} />
    </button>
  );
}
