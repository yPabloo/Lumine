"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Pause,
  Play,
} from "lucide-react";

export type MediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
    }
  | {
      type: "video";
      src: string;
      title: string;
      poster?: string;
    };

type MediaCarouselProps = {
  items: MediaItem[];
  interval?: number;
};

export function MediaCarousel({
  items,
  interval = 6000,
}: MediaCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const goNext = useCallback(() => {
    if (items.length < 2) return;

    setCurrent((index) => (index + 1) % items.length);
  }, [items.length]);

  const goPrevious = useCallback(() => {
    if (items.length < 2) return;

    setCurrent((index) => (index - 1 + items.length) % items.length);
  }, [items.length]);

  const activeItem = items[current];

  useEffect(() => {
    if (
      paused ||
      items.length < 2 ||
      !activeItem ||
      activeItem.type === "video"
    ) {
      return;
    }

    const timer = window.setTimeout(goNext, interval);

    return () => window.clearTimeout(timer);
  }, [activeItem, goNext, interval, items.length, paused]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || activeItem?.type !== "video") return;

    if (paused) {
      video.pause();
      return;
    }

    video.play().catch(() => {
      // Alguns navegadores podem bloquear o autoplay.
    });
  }, [activeItem, current, paused]);

  if (!activeItem) {
    return (
      <div className="institution-carousel institution-carousel--empty">
        <Images aria-hidden="true" />
        <strong>Momentos do Lumine</strong>
        <span>Adicione fotos ou vídeos na pasta public/lumine-media.</span>
      </div>
    );
  }

  return (
    <section
      className="institution-carousel"
      aria-label="Fotos e vídeos do Lumine"
      aria-roledescription="carrossel"
    >
      <div className="institution-carousel-media">
        {activeItem.type === "image" ? (
          <Image
            key={activeItem.src}
            src={activeItem.src}
            alt={activeItem.alt}
            fill
            sizes="(max-width: 900px) 92vw, 550px"
            className="institution-carousel-image"
            priority={current === 0}
          />
        ) : (
          <video
            key={activeItem.src}
            ref={videoRef}
            src={activeItem.src}
            poster={activeItem.poster}
            className="institution-carousel-video"
            aria-label={activeItem.title}
            autoPlay
            muted
            playsInline
            controls
            preload="metadata"
            loop={items.length === 1}
            onEnded={goNext}
          />
        )}
      </div>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="carousel-control carousel-control--previous"
            aria-label="Mostrar mídia anterior"
            onClick={goPrevious}
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            className="carousel-control carousel-control--next"
            aria-label="Mostrar próxima mídia"
            onClick={goNext}
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <button
            type="button"
            className="carousel-pause"
            aria-label={paused ? "Continuar carrossel" : "Pausar carrossel"}
            onClick={() => setPaused((currentValue) => !currentValue)}
          >
            {paused ? (
              <Play aria-hidden="true" />
            ) : (
              <Pause aria-hidden="true" />
            )}
          </button>

          <div className="carousel-indicators" aria-label="Selecionar mídia">
            {items.map((item, index) => (
              <button
                type="button"
                key={`${item.src}-${index}`}
                className={
                  index === current ? "carousel-indicator--active" : ""
                }
                aria-label={`Mostrar item ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}