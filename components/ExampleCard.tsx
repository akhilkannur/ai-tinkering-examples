import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ExampleRecord, SponsorRecord } from "../lib/airtable";
import Image from "next/image";
import { Clock } from "lucide-react";

interface ExampleCardProps {
  example: ExampleRecord;
  sponsor?: SponsorRecord;
  priority?: boolean; // For above-the-fold images
  onOpen: (example: ExampleRecord) => void;
}

export default function ExampleCard({
  example,
  sponsor,
  priority = false,
  onOpen,
}: ExampleCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    example.screenshots?.[0]?.url || null
  );

  useEffect(() => {
    setImageUrl(example.screenshots?.[0]?.url || null);
    setImageError(false);

    // Check if image is in cache
    const img = new window.Image();
    img.src = example.screenshots?.[0]?.url || "";
    if (img.complete) {
      setImageLoading(false);
    }
  }, [example.screenshots]);

  const handleImageError = () => {
    setImageError(true);
  };

  const img = imageUrl;
  const optimizedImageUrl = img;

  // Generate the SEO-friendly URL
  const categorySlug =
    example.category?.toLowerCase().replace(/\s+/g, "-") || "uncategorized";
  const exampleUrl = `/ai-examples/${categorySlug}/${example.slug}`;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on share button or links
    if (
      (e.target as HTMLElement).closest(".share-button") ||
      (e.target as HTMLElement).closest(".external-link") ||
      (e.target as HTMLElement).closest(".sponsor-link")
    ) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    onOpen(example);
  };

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="card group cursor-pointer relative flex flex-col bg-[#fef6e4] custom-shadow rounded-2xl overflow-hidden border border-transparent hover:border-accent transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Card content with higher z-index */}
      <div className="relative z-10 flex-grow" onClick={handleCardClick}>
        {img && (
          <div className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden bg-[#fef6e4] rounded-t-2xl">
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]" />
            )}

            {/* Error fallback */}
            {imageError && (
              <div className="absolute inset-0 bg-[#fef6e4] flex items-center justify-center">
                <div className="text-slate-400 text-sm">Image unavailable</div>
              </div>
            )}

            {!imageError && (
              <>
                <Image
                  src={optimizedImageUrl || img || "/placeholder.svg"}
                  alt={example.title}
                  fill
                  className={`object-cover object-left-top group-hover:scale-105 transition-transform duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={priority}
                  loading={priority ? "eager" : "lazy"}
                  fetchPriority={priority ? "high" : "auto"}
                  quality={80}
                  onLoad={() => setImageLoading(false)}
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-blue-900 opacity-10 group-hover:opacity-5 transition-opacity duration-300"></div>
              </>
            )}
          </div>
        )}
        <div className="p-3 sm:p-4 text-center">
          <h3 className="text-lg sm:text-xl font-extrabold leading-tight text-text-color line-clamp-2">
            {example.title}
          </h3>
          {example.read_time && (
            <div className="flex items-center justify-center text-sm text-slate-600 mt-2">
              <Clock size={14} className="mr-1" />
              <span>{example.read_time} min read</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}