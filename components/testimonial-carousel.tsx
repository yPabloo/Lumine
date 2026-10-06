"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Quote, Video } from "lucide-react";

export type TestimonialVideo = {
  src: string;
  parentName: string;
  relationship: string;
  quote: string;
  poster?: string;
};

type TestimonialCarouselProps = {
  items: TestimonialVideo[];
};

export function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  }, [current]);

  if (items.length === 0) {
    return (
      <div className="testimonial-empty">
        <span className="testimonial-empty-icon"><Video aria-hidden="true" /></span>
        <div>
          <strong>Em breve, novas histórias por aqui.</strong>
          <p>Famílias do Lumine compartilharão suas experiências neste espaço.</p>
        </div>
      </div>
    );
  }

  const item = items[current];

  function show(index: number) {
    setCurrent((index + items.length) % items.length);
  }

  return (
    <div
      className="testimonial-carousel"
      aria-label="Depoimentos de famílias do Lumine"
      aria-roledescription="carrossel"
    >
      <div className="testimonial-video-wrap">
        <video
          key={item.src}
          ref={videoRef}
          src={item.src}
          poster={item.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={`Depoimento de ${item.parentName}`}
        />
      </div>

      <article className="testimonial-copy">
        <Quote aria-hidden="true" />
        <blockquote>{item.quote}</blockquote>
        <div className="testimonial-author">
          <span><Heart aria-hidden="true" /></span>
          <div>
            <strong>{item.parentName}</strong>
            <small>{item.relationship}</small>
          </div>
        </div>

        {items.length > 1 && (
          <div className="testimonial-controls">
            <button type="button" onClick={() => show(current - 1)} aria-label="Mostrar depoimento anterior">
              <ChevronLeft aria-hidden="true" />
            </button>

            <div className="testimonial-dots" aria-label="Selecionar depoimento">
              {items.map((testimonial, index) => (
                <button
                  type="button"
                  key={testimonial.src}
                  className={index === current ? "testimonial-dot--active" : ""}
                  aria-label={`Mostrar depoimento ${index + 1}`}
                  aria-current={index === current ? "true" : undefined}
                  onClick={() => show(index)}
                />
              ))}
            </div>

            <button type="button" onClick={() => show(current + 1)} aria-label="Mostrar próximo depoimento">
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </article>
    </div>
  );
}
