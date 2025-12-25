import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useAuth } from "../context/AuthContext";

export default function HeaderSlider() {
  const { slides, loadingData } = useAuth();

  if (loadingData || slides.length === 0) return null;

  return (
    <div className="w-full h-[250px] md:h-[420px] px-4 md:px-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-full rounded-xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <img
              src={slide.image.url}
              alt="Header Slide"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
