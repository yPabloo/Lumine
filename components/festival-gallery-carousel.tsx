"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Pause,
  Play,
} from "lucide-react";

export type FestivalGalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type FestivalGalleryCarouselProps = {
  items: FestivalGalleryImage[];
  interval?: number;
};

export function FestivalGalleryCarousel({
  items,
  interval = 5500,
}: FestivalGalleryCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    if (items.length < 2) return;
    setCurrent((index) => (index + 1) % items.length);
  }, [items.length]);

  const goPrevious = useCallback(() => {
    if (items.length < 2) return;
    setCurrent((index) => (index - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (paused || items.length < 2) return;

    const timer = window.setTimeout(goNext, interval);
    return () => window.clearTimeout(timer);
  }, [current, goNext, interval, items.length, paused]);

  if (items.length === 0) {
    return (
      <div className="festival-gallery-empty">
        <span className="festival-gallery-empty-icon">
          <Images aria-hidden="true" />
        </span>
        <strong>Novas imagens serão publicadas em breve</strong>
        <p>
          Este espaço reunirá cores, descobertas e momentos especiais do
          Festival Lumine em Cores.
        </p>
      </div>
    );
  }

  const activeItem = items[current];

  return (
    <div
      className="festival-gallery-carousel"
      aria-roledescription="carrossel"
      aria-label="Imagens ilustrativas do Festival Lumine em Cores"
    >
      <figure className="festival-gallery-slide">
        <Image
          key={activeItem.src}
          src={activeItem.src}
          alt={activeItem.alt}
          fill
          sizes="(max-width: 700px) 94vw, 1120px"
          priority={current === 0}
        />

        {activeItem.caption && (
          <figcaption>{activeItem.caption}</figcaption>
        )}
      </figure>

      {items.length > 1 && (
        <>
          <button
            type="button"
            className="festival-gallery-arrow festival-gallery-arrow--previous"
            aria-label="Mostrar imagem anterior"
            onClick={goPrevious}
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            className="festival-gallery-arrow festival-gallery-arrow--next"
            aria-label="Mostrar próxima imagem"
            onClick={goNext}
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <div className="festival-gallery-controls">
            <div className="festival-gallery-dots" aria-label="Selecionar imagem">
              {items.map((item, index) => (
                <button
                  type="button"
                  key={item.src}
                  aria-label={`Mostrar imagem ${index + 1}`}
                  aria-current={current === index ? "true" : undefined}
                  className={current === index ? "festival-gallery-dot--active" : ""}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>

            <button
              type="button"
              className="festival-gallery-pause"
              aria-label={paused ? "Continuar apresentação" : "Pausar apresentação"}
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
