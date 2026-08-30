import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Brain, Languages, MapPin, MessageCircle, Music2, Palette, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { activities, festival, groups, lumine, support, values, workshops } from "@/lib/site-data";
import {
  MediaCarousel,
  type MediaItem,
} from "@/components/media-carousel";

const institutionalMedia: MediaItem[] = [
  {
    type: "video",
    src: "/lumine-media/video-01.mp4",
    title: "Momentos de uma atividade no Lumine",
    poster: "/lumine-media/capa-video-01.jpg",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="home-hero">
          <div className="paint-cloud paint-cloud--blue" aria-hidden="true" />
          <div className="paint-cloud paint-cloud--pink" aria-hidden="true" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><Sparkles size={16} /> {lumine.tagline}</span>
              <h1>Um lugar para <em>crescer, criar</em> e iluminar o futuro.</h1>
              <p>{lumine.description}</p>
              <div className="button-row">
                <a className="button button--primary" href={lumine.phoneHref} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> Agende uma visita
                </a>
                <Link className="button button--secondary" href="/festival">
                  Conheça o Festival <ArrowRight size={18} />
                </Link>
              </div>
              <p className="hero-location"><MapPin size={17} /> {lumine.address}</p>
            </div>
            <div className="hero-art" aria-label="Fotos e vídeos do Lumine">
              <MediaCarousel items={institutionalMedia} />
            </div>
          </div>
        </section>

        <section className="section groups-section" id="lumine">
          <div className="shell">
            <div className="section-heading section-heading--groups">
              <span className="kicker">Do maternal ao fundamental</span>

              <h2>Cada fase encontra espaço para acontecer.</h2>

              <p>
                Respeitamos o ritmo de cada criança e construímos experiências
                que estimulam autonomia, vínculos, criatividade e prazer em
                aprender.
              </p>
            </div>

            <div className="groups-grid">
              {groups.map((group) => (
                <article
                  className={[
                    "group-card",
                    `group-card--${group.color}`,
                    group.art ? "group-card--with-character" : "",
                  ].join(" ")}
                  key={group.title}
                >
                  <div className="group-card-character">
                    <Image
                      src={group.art}
                      alt={group.imageAlt}
                      width={900}
                      height={900}
                      sizes="240px"
                    />
                  </div>

                  <div className="group-card-content">
                    <h3>{group.title}</h3>

                    <div className="group-age">
                      <span>Faixa etária</span>
                      <strong>{group.ages}</strong>
                    </div>

                    <div className="group-card-divider" aria-hidden="true" />

                    <p className="group-description">
                      {group.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--sky" id="atividades">
          <div className="shell learning-grid">
            <div className="learning-intro">
              <span className="kicker">Experiências que deixam marca</span>
              <h2>Aprender também é cantar, brincar, imaginar e criar.</h2>
              <p>Uma rotina rica em linguagem, movimento e expressão, com propostas adequadas à infância.</p>
              <span className="kicker values-kicker">Valores</span>
              <div className="value-cloud" aria-label="Valores do Lumine">
                {values.map((value) => <span key={value}>{value}</span>)}
              </div>
            </div>
            <div className="learning-cards">
              <article className="learning-card learning-card--pink">
                <Palette />
                <h3>Atividades</h3>
                <ul>{activities.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article className="learning-card learning-card--yellow">
                <BookOpen />
                <h3>Oficinas</h3>
                <ul>{workshops.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
              <article className="learning-card learning-card--blue">
                <Brain />
                <h3>Acompanhamento</h3>
                <ul>{support.map((item) => <li key={item}>{item}</li>)}</ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section festival-preview">
          <div className="shell festival-preview-card">
            <div className="festival-scribble" aria-hidden="true"><Palette /><Music2 /><Languages /></div>
            <div>
              <span className="eyebrow eyebrow--light"><Sparkles size={16} /> {festival.eyebrow}</span>
              <h2>{festival.name}</h2>
              <p>{festival.description}</p>
              <div className="button-row">
                <Link className="button button--light" href="/festival">Ver detalhes</Link>
                <Link className="button button--sun" href="/festival/inscricao">Fazer inscrição <ArrowRight size={18} /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
