import { Link } from "react-router-dom";
import { cn } from "../utils";

interface Props {
  title: string;
  image: string;
  className: string;
}

export default function GridOption({ title, image, className }: Props) {
  return (
    <Link to="/shop" className={cn("grid-option relative", className)}>
      <h2 className=" text-xl font-bold">{title}</h2>

      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 object-cover w-full h-full opacity-20 rounded-md"
        />
      )}
    </Link>
  );
}
