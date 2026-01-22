"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  setIndex: (i: number) => void;
}

export default function Lightbox({
  images,
  index,
  onClose,
  setIndex,
}: LightboxProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close */}
      <button
        className="absolute top-6 right-6 text-white hover:text-primary"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          className="absolute left-6 text-white hover:text-primary"
          onClick={() => setIndex(index - 1)}
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt="Event"
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
      />

      {/* Next */}
      {index < images.length - 1 && (
        <button
          className="absolute right-6 text-white hover:text-primary"
          onClick={() => setIndex(index + 1)}
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
}
