import React, { useState, useEffect, useRef, FC } from "react";

interface CarouselProps {
  slides: React.ReactNode[];
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const startSlideTimer = (): void => {
    stopSlideTimer();
    slideInterval.current = setInterval(() => {
      setCurrentSlide((currentSlide) => (currentSlide + 1) % slides.length);
    }, 3000);
  };

  const stopSlideTimer = (): void => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  useEffect(() => {
    startSlideTimer();
    return () => stopSlideTimer();
  }, []);

  const goToSlide = (index: number): void => {
    stopSlideTimer();
    setCurrentSlide(index);
    startSlideTimer();
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={() => {
        stopSlideTimer();
        setIsHovering(true);
      }}
      onMouseLeave={() => {
        startSlideTimer();
        setIsHovering(false);
      }}
    >
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-none w-full"
            style={{ transition: "transform 0.7s ease-in-out" }}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentSlide ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
      {isHovering && (
        <>
          <button
            className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-white bg-opacity-50 text-primaryColor text-4xl cursor-pointer"
            onClick={() =>
              goToSlide((currentSlide - 1 + slides.length) % slides.length)
            }
          >
            &lt;
          </button>
          <button
            className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white bg-opacity-50 text-primaryColor text-4xl cursor-pointer"
            onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          >
            &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
