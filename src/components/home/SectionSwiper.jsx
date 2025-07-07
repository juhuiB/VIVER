import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import useMovieData from "../../hooks/useMovieData";
import useTVData from "../../hooks/useTvData";

export default function SectionSwiper({ section, filter, onSelectItem }) {
  const movieItems = useMovieData(section);
  const tvItems = useTVData(section);

  let items = [];

  if (filter === "movie") {
    items = movieItems;
  } else if (filter === "tv") {
    items = tvItems;
  } else {
    items = movieItems; // all일 경우 영화 기준 fallback
  }

  const imageBase = "https://image.tmdb.org/t/p/w300";

  return (
    <section className="">
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="mb-8"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="cursor-pointer rounded border hover:shadow transition p-2"
              onClick={() => onSelectItem && onSelectItem(item)} // 여기 추가
            >
              <img
                src={
                  item.poster_path
                    ? `${imageBase}${item.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={item.title || item.name}
                className="w-full h-44 object-cover rounded mb-2"
              />
              <p className="text-sm text-center font-medium">
                {item.title || item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
