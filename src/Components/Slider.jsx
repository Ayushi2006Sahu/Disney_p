import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../Services/GlobalApi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const screenWidth = window.innerWidth;

function Slider() {
    const [movieList, setMovieList] = useState([]);
    const elementRef = useRef(null);

    useEffect(() => {
        const getTrendingMovies = async () => {
            try {
                const response = await GlobalApi.getTrendingVideos();
                console.log("Fetched Movies:", response.data.results);
                setMovieList(response.data.results || []); // Handle empty response
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        };

        getTrendingMovies();
    }, []);

    const sliderRight = () => {
        if (elementRef.current) {
            elementRef.current.scrollLeft += screenWidth - 110;
        }
    };

    const sliderLeft = () => {
        if (elementRef.current) {
            elementRef.current.scrollLeft -= screenWidth - 110;
        }
    };

    return (
        <div className="relative">
            {/* Left Arrow */}
            <HiChevronLeft
                className="hidden md:block text-white text-[30px] absolute
                mx-8 mt-[150px] cursor-pointer z-10"
                onClick={sliderLeft}
            />
            {/* Right Arrow */}
            <HiChevronRight
                className="hidden md:block text-white text-[30px] absolute
                mx-8 mt-[150px] cursor-pointer right-0 z-10"
                onClick={sliderRight}
            />

            {/* Movie Slider */}
            <div
                className="flex overflow-x-auto w-full px-16 py-4 scrollbar-none scroll-smooth"
                ref={elementRef}
            >
                {movieList.map((item) => (
                    <img
                        key={item.id} // Key Prop Added
                        src={IMAGE_BASE_URL + item.backdrop_path}
                        className="min-w-full md:h-[310px] object-cover
                        object-left-top mr-5 rounded-md hover:border-[4px]
                        border-gray-400 transition-all duration-100 ease-in"
                        alt={item.title || "Movie Image"} // Accessible alt text
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;
