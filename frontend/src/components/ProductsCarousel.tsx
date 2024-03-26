import { useState, useEffect, useRef, FC, useCallback } from "react";
import { Product } from "../types/Product";
import { Link } from "react-router-dom";

interface CarouselProps {
  products: Product[];
}

const ProductsCarousel: FC<CarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const goToNextSet = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex < products.length ? newIndex : 0;
    });
  }, [products.length]);

  const goToPreviousSet = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex >= 0 ? newIndex : products.length - 1;
    });
  };

  useEffect(() => {
    const interval = setInterval(goToNextSet, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, products.length, goToNextSet]);

  // Calculate the transform percentage based on the current index
  // This assumes each product takes up full width (100%) of the container
  const getTransform = () => {
    return `translateX(-${(currentIndex * 100) / 3}%)`;
  };

  return (
    <div className="relative overflow-hidden mt-[30px]  p-10 border-[1px]">
      <button
        onClick={goToPreviousSet}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 z-10"
        type="button"
      >
        &lt;
      </button>
      {/* Wrapper to apply the transform for smooth sliding */}
      <div
        ref={wrapperRef}
        className="flex transition-transform ease-out duration-500 lg:gap-[100px] "
        style={{ transform: getTransform() }}
      >
        {products.map((product) => (
          <div
            key={product._id}
            className="min-w-[33.333%] flex-shrink-0 p-4  border-[1px]"
          >
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[200px] lg:h-[500px] object-cover"
              />
            </Link>
            <p className="text-center mt-3 text-lg font-semibold">
              {product.name}
            </p>
            <p className="text-center">
              Old price -{" "}
              <span className=" line-through text-red-500">
                ${product.price}
              </span>
            </p>
            <p className=" text-center">
              New Price -{" "}
              <span className=" text-green-600">${product.price - 30}</span>
            </p>
            <p className=" mt-5">Produced by {product.brand}</p>
          </div>
        ))}
      </div>
      <button
        onClick={goToNextSet}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 z-10"
        type="button"
      >
        &gt;
      </button>
    </div>
  );
};

export default ProductsCarousel;
