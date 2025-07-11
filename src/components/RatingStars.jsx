// components/RatingStars.jsx
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function RatingStars({ value = 0, onChange }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="flex gap-6 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className="w-8 h-8"
          aria-label={`${star}점`}
        >
          <FaStar
            className={ `w-full h-full ${
                star <= (hovered || value) ? "text-[#e50101]" : "text-gray-300"
            }`}
            
          />
        </button>
      ))}
    </div>
  );
}
