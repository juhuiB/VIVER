import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import noPoster from "../../assets/img_noposter.png";
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
        slidesPerView={3.5}
        breakpoints={{
          360: { slidesPerView: 2.5 },
          640: { slidesPerView: 3.5 },
          768: { slidesPerView: 4.5 },
          1024: { slidesPerView: 5.5 },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="cursor-pointer"
              onClick={() => onSelectItem && onSelectItem(item)}
            >
              <img
                src={
                  item.poster_path
                    ? `${imageBase}${item.poster_path}`
                    : noPoster
                }
                alt={item.title || item.name}
                className="w-full h-[250px] rounded mb-2"
              />
              <p className="text-sm font-medium">{item.title || item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
