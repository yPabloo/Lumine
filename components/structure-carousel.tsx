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

export type StructureImage = {
  src: string;
  alt: string;
};

type StructureCarouselProps = {
  items: StructureImage[];
  interval?: number;
};

export function StructureCarousel({
  items,
  interval = 6000,
}: StructureCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = useCallback(() => {
    if (items.length < 2) return;
    setCurrent((index) => (index + 1) % items.length);
  }, [items.length]);

  const goPrevious = useCallback(() => {
    if (items.length < 2) return;

    setCurrent(
      (index) => (index - 1 + items.length) % items.length,
    );
  }, [items.length]);

  useEffect(() => {
    if (paused || items.length < 2) return;

    const timer = window.setTimeout(goNext, interval);

    return () => window.clearTimeout(timer);
  }, [current, goNext, interval, items.length, paused]);

  if (items.length === 0) {
    return (
      <div className="structure-carousel structure-carousel--empty">
        <Images aria-hidden="true" />
        <strong>Nossa Estrutura</strong>
        <span>
          Adicione as fotos dos ambientes na pasta
          public/lumine-structure.
        </span>
      </div>
    );
  }

  const visibleItems = Array.from(
    {
      length: Math.min(3, items.length),
    },
    (_, offset) => items[(current + offset) % items.length],
  );

  return (
    <div
      className="structure-carousel"
      aria-roledescription="carrossel"
      aria-label="Fotos da estrutura do Lumine"
    >
      <div className="structure-background" aria-hidden="true">
        <Image
          key={items[current].src}
          src={items[current].src}
          alt=""
          fill
          sizes="100vw"
        />
      </div>

      <div className="structure-overlay" aria-hidden="true" />

      <div className="structure-content">
        <div className="structure-heading">
          <span className="kicker kicker--light">
            Conheça nossos espaços
          </span>

          <h2>Nossa Estrutura</h2>

          <p>
            Ambientes preparados para acolher, estimular descobertas e
            proporcionar experiências significativas para cada criança.
          </p>
        </div>

        <div className="structure-track">
          {visibleItems.map((item, index) => (
            <figure
              className="structure-slide"
              key={`${item.src}-${index}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 30vw"
              />
            </figure>
          ))}
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              className="structure-arrow structure-arrow--previous"
              aria-label="Mostrar fotos anteriores"
              onClick={goPrevious}
            >
              <ChevronLeft aria-hidden="true" />
            </button>

            <button
              type="button"
              className="structure-arrow structure-arrow--next"
              aria-label="Mostrar próximas fotos"
              onClick={goNext}
            >
              <ChevronRight aria-hidden="true" />
            </button>

            <div className="structure-controls">
              <div
                className="structure-indicators"
                aria-label="Selecionar imagem"
              >
                {items.map((item, index) => (
                  <button
                    type="button"
                    key={item.src}
                    aria-label={`Mostrar imagem ${index + 1}`}
                    aria-current={
                      current === index ? "true" : undefined
                    }
                    className={
                      current === index
                        ? "structure-indicator--active"
                        : ""
                    }
                    onClick={() => setCurrent(index)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="structure-pause"
                aria-label={
                  paused
                    ? "Continuar apresentação"
                    : "Pausar apresentação"
                }
                onClick={() => setPaused((value) => !value)}
              >
                {paused ? (
                  <Play aria-hidden="true" />
                ) : (
                  <Pause aria-hidden="true" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}