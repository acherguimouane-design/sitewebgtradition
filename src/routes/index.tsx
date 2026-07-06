import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/logo.png";
import storefrontAsset from "@/assets/storefront.jpg";
import heroImg from "@/assets/hero.jpg";
import catGlaces from "@/assets/cat-glaces.jpg";
import catCrepes from "@/assets/cat-crepes.jpg";
import catPatisseries from "@/assets/cat-patisseries.jpg";
import catMacarons from "@/assets/cat-macarons.jpg";
import catPlateaux from "@/assets/cat-plateaux.jpg";
import catViennoiseries from "@/assets/cat-viennoiseries.jpg";
import galMilkshake from "@/assets/gal-milkshake.jpg";
import galGateau from "@/assets/gal-gateau.jpg";
import galArtisan from "@/assets/gal-artisan.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const WHATSAPP_URL =
  "https://wa.me/212524664974?text=" +
  encodeURIComponent("Bonjour, je souhaite avoir des informations sur vos produits.");

const NAV_LINKS = [
  { href: "#histoire", label: "L'Histoire" },
  { href: "#carte", label: "La Carte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#contact", label: "Contact" },
];

type Category = {
  key: string;
  emoji: string;
  title: string;
  subtitle: string;
  img: string;
  items: string[];
};

const CATEGORIES: Category[] = [
  {
    key: "glaces",
    emoji: "🍨",
    title: "Glaces & Boissons",
    subtitle: "Sorbets et crèmes glacées",
    img: catGlaces,
    items: [
      "Boule de Glace",
      "Glace Ferrero",
      "Glace Pistache",
      "Verrine de Glace",
      "Magnum",
      "Glace Pot de Fruits",
      "Glace 1/2 Litre",
      "Glace 1 Litre",
      "Milkshake",
      "Chocolat Chaud",
    ],
  },
  {
    key: "crepes",
    emoji: "🧇",
    title: "Crêpes & Gaufres",
    subtitle: "Gourmandises chaudes",
    img: catCrepes,
    items: [
      "Crêpe Nature",
      "Crêpe Chocolat",
      "Crêpe Caramel",
      "Crêpe Miel",
      "Gaufre Nature",
      "Gaufre Chocolat",
    ],
  },
  {
    key: "patisseries",
    emoji: "🎂",
    title: "Pâtisseries Glacées",
    subtitle: "Créations signature",
    img: catPatisseries,
    items: [
      "Tranche de Gâteau",
      "Mini Trompe-l'Œil",
      "Trompe-l'Œil",
      "Mangue Coco",
      "Tiramisu",
      "Nougat",
      "Tarte Variée",
      "Yaourt Fruits Rouges",
      "Pistache",
      "Amarena Chocolat",
      "Chocolat Ferrero",
      "Ferrero Rocher – Les Deux Bombes",
    ],
  },
  {
    key: "macarons",
    emoji: "🍬",
    title: "Macarons",
    subtitle: "Coffrets d'exception",
    img: catMacarons,
    items: ["Macaron", "Boîte de 6", "Boîte de 12", "Boîte de 15"],
  },
  {
    key: "plateaux",
    emoji: "🎁",
    title: "Plateaux & Gâteaux de Soirée",
    subtitle: "Sur-mesure pour vos événements",
    img: catPlateaux,
    items: [
      "Gâteaux de Soirée",
      "Plateau Prestige",
      "Plateau Beldi",
      "Mini Plateau Trompe-l'Œil",
    ],
  },
  {
    key: "viennoiseries",
    emoji: "🥐",
    title: "Viennoiseries",
    subtitle: "Fraîches chaque matin",
    img: catViennoiseries,
    items: [
      "Croissant",
      "Pain au Chocolat",
      "Pain Suisse",
      "Viennoiserie Fourrée",
      "Schneck",
    ],
  },
];

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoAsset}
      alt="Goût & Traditions"
      className={className}
      width={660}
      height={420}
    />
  );
}

function Nav() {
  const scrolled = useScrolled(30);
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-panel border-b border-gold/20 py-3"
            : "bg-transparent py-5",
        ].join(" ")}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-center gap-3">
            <Logo className="h-10 w-auto md:h-12" />
          </a>
          <div className="hidden gap-9 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-[11px] tracking-[0.3em] text-cream/80 uppercase transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center border border-gold/50 px-5 py-2 font-display text-[10px] tracking-[0.3em] text-gold uppercase transition-all hover:bg-gold hover:text-emerald-deep"
          >
            Commander
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className="block h-px w-6 bg-gold" />
            <span className="block h-px w-6 bg-gold" />
            <span className="block h-px w-4 bg-gold" />
          </button>
        </div>
      </nav>
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden glass-panel pt-24"
          onClick={() => setOpen(false)}
        >
          <div className="flex flex-col items-center gap-6 py-10">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-sm tracking-[0.4em] text-cream uppercase hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 border border-gold px-8 py-3 font-display text-xs tracking-[0.3em] text-gold uppercase"
            >
              Commander
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function GoldParticles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${60 + ((i * 17) % 40)}%`,
            animationDelay: `${(i * 0.6) % 8}s`,
            animationDuration: `${7 + (i % 5)}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1088}
          className="h-full w-full object-cover object-center scale-105 will-change-transform"
          style={{
            transform: loaded ? "scale(1.02)" : "scale(1.1)",
            transition: "transform 3s cubic-bezier(0.19,1,0.22,1)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 zellige-motif opacity-30" />
      </div>

      <GoldParticles />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
        <div
          className="animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <Logo className="mx-auto h-40 w-auto drop-shadow-[0_0_35px_rgba(212,175,55,0.35)] md:h-56" />
        </div>

        <div
          className="mt-8 flex items-center gap-4 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="h-px w-16 bg-gold/50" />
          <span className="font-display text-[10px] tracking-[0.5em] text-gold uppercase">
            Safi · Maroc
          </span>
          <div className="h-px w-16 bg-gold/50" />
        </div>

        <h1
          className="mt-6 font-display text-4xl leading-tight tracking-[0.18em] text-balance md:text-6xl lg:text-7xl gold-gradient-text animate-fade-up"
          style={{ animationDelay: "0.9s" }}
        >
          GOÛT &amp; TRADITIONS
        </h1>

        <p
          className="mt-6 max-w-2xl font-serif text-2xl italic text-cream/90 md:text-3xl animate-fade-up"
          style={{ animationDelay: "1.2s" }}
        >
          L'Art de la Glace Artisanale
        </p>

        <a
          href="#carte"
          className="group mt-12 inline-flex items-center gap-4 bg-gold px-10 py-4 font-display text-[11px] tracking-[0.35em] text-emerald-deep uppercase transition-all hover:bg-gold-light hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] animate-fade-up"
          style={{ animationDelay: "1.5s" }}
        >
          Découvrir notre univers
          <svg
            className="h-3 w-3 transition-transform group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path d="M4 10h12M12 5l5 5-5 5" strokeWidth="1.5" strokeLinecap="square" />
          </svg>
        </a>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
          <span className="font-display text-[9px] tracking-[0.4em] text-gold uppercase">
            Défiler
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Reveal({
  children,
  as: As = "div",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  as?: "div" | "section" | "h2" | "p" | "span" | "li" | "article";
  delay?: number;
  className?: string;
}) {
  const style = {
    transitionDelay: `${delay}ms`,
  } as React.CSSProperties;
  const cls =
    "opacity-0 translate-y-6 transition-all duration-[900ms] ease-[cubic-bezier(0.19,1,0.22,1)] [&.is-revealed]:opacity-100 [&.is-revealed]:translate-y-0 " +
    className;
  return (
    <As data-reveal className={cls} style={style}>
      {children}
    </As>
  );
}

function Histoire() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="histoire"
      ref={ref}
      className="relative bg-emerald-deep py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 zellige-motif opacity-25" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:items-center md:px-10">
        <Reveal className="relative">
          <div className="absolute -inset-4 border border-gold/25 translate-x-5 translate-y-5" />
          <img
            src={storefrontAsset}
            alt="Façade de Goût & Traditions à Safi"
            loading="lazy"
            className="relative aspect-[4/5] w-full object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
          />
        </Reveal>

        <div className="space-y-8">
          <Reveal>
            <span className="font-display text-[10px] tracking-[0.5em] text-gold uppercase">
              Notre Héritage
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-4xl leading-tight text-cream md:text-5xl">
              Une Passion,
              <br />
              <span className="italic font-serif text-gold">un Savoir-Faire</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="font-serif text-xl italic leading-relaxed text-cream/85 text-pretty md:text-2xl">
              Au cœur de Safi, Goût &amp; Traditions célèbre l'alliance des techniques
              glacées les plus fines et des saveurs ancestrales du Maroc.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <p className="leading-relaxed text-cream/70 text-pretty">
              Chaque sorbet, chaque pâtisserie est une œuvre façonnée à la main. Nos
              maîtres glaciers et pâtissiers travaillent les ingrédients les plus nobles
              — fruits frais de saison, pistache de haute qualité, chocolat grand cru —
              pour vous offrir une expérience sensorielle inédite, du croquant d'un
              macaron à l'onctuosité d'une glace signature.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="grid grid-cols-3 gap-4 border-t border-gold/20 pt-8">
              <div>
                <span className="block font-display text-2xl text-gold">100%</span>
                <span className="mt-1 block text-[10px] tracking-[0.25em] text-cream/50 uppercase">
                  Fait Maison
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl text-gold">Frais</span>
                <span className="mt-1 block text-[10px] tracking-[0.25em] text-cream/50 uppercase">
                  Chaque Matin
                </span>
              </div>
              <div>
                <span className="block font-display text-2xl text-gold">Safi</span>
                <span className="mt-1 block text-[10px] tracking-[0.25em] text-cream/50 uppercase">
                  Depuis Toujours
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  return (
    <Reveal
      as="article"
      delay={index * 90}
      className="group relative overflow-hidden border border-gold/10 bg-emerald-deep transition-colors hover:border-gold/40"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={cat.img}
          alt={cat.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/40 to-transparent" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-emerald-deep/70 backdrop-blur-sm" />
        <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-8">
          <span className="mb-2 font-display text-[10px] tracking-[0.35em] text-gold/80 uppercase">
            {cat.emoji} {cat.subtitle}
          </span>
          <h3 className="font-display text-2xl tracking-wide text-cream md:text-3xl">
            {cat.title}
          </h3>
          <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-96 group-hover:opacity-100">
            <ul className="grid grid-cols-1 gap-1.5 border-t border-gold/20 pt-4 font-serif text-[15px] italic text-cream/85 sm:grid-cols-2">
              {cat.items.map((it) => (
                <li key={it} className="flex items-center gap-2 leading-snug">
                  <span className="text-gold/70">◆</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Carte() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="carte" ref={ref} className="bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-20 text-center">
          <Reveal>
            <span className="font-display text-[10px] tracking-[0.5em] text-gold uppercase">
              Dégustation
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-cream md:text-6xl">
              Notre <span className="italic font-serif text-gold">Carte</span>
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <div className="mx-auto mt-6 h-px w-24 bg-gold/40" />
          </Reveal>
          <Reveal delay={320}>
            <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic text-cream/60">
              Une expérience sensorielle. Passez la souris pour révéler chaque création.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <CategoryCard key={c.key} cat={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Galerie() {
  const ref = useReveal<HTMLElement>();
  const images = [
    { src: heroImg, alt: "Dégustation glacée", span: "lg:col-span-2 lg:row-span-2" },
    { src: galArtisan, alt: "Le geste artisanal", span: "" },
    { src: galMilkshake, alt: "Milkshake signature", span: "" },
    { src: galGateau, alt: "Gâteau glacé de soirée", span: "lg:col-span-2" },
    { src: catMacarons, alt: "Coffret de macarons", span: "" },
  ];
  return (
    <section id="galerie" ref={ref} className="bg-emerald-deep py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 text-center">
          <Reveal>
            <span className="font-display text-[10px] tracking-[0.5em] text-gold uppercase">
              L'Univers
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-cream md:text-6xl">
              Galerie <span className="italic font-serif text-gold">d'Exception</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4 lg:auto-rows-[220px]">
          {images.map((img, i) => (
            <Reveal
              key={img.alt}
              as="article"
              delay={i * 80}
              className={"group relative overflow-hidden " + img.span}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-emerald-deep/0 transition-colors duration-500 group-hover:bg-emerald-deep/30" />
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0">
                <span className="font-serif text-lg italic text-cream">{img.alt}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="contact" ref={ref} className="relative bg-ink py-28 md:py-40 overflow-hidden">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-96 w-96 rounded-full bg-emerald/30 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 text-center">
          <Reveal>
            <span className="font-display text-[10px] tracking-[0.5em] text-gold uppercase">
              Nous Rencontrer
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-4 font-display text-4xl tracking-wide text-cream md:text-6xl">
              Nous vous <span className="italic font-serif text-gold">Attendons</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <Reveal className="glass-panel border border-gold/20 p-10 md:p-12">
            <div className="space-y-10">
              <div className="flex items-start gap-5">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">
                    Adresse
                  </p>
                  <p className="mt-3 font-serif text-xl text-cream leading-relaxed" dir="rtl">
                    شارع مولاي يوسف، قرب ملعب كرة القدم، قرب مقهى دولتشي
                  </p>
                  <p className="mt-2 text-cream/70">
                    Avenue Moulay Youssef · Safi, Maroc
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">
                    Horaires
                  </p>
                  <p className="mt-3 font-serif text-xl text-cream">Tous les jours</p>
                  <p className="text-cream/70">10h00 — 23h00</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A17 17 0 013 6a2 2 0 012-2z" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">
                    Téléphone
                  </p>
                  <a
                    href="tel:+212524664974"
                    className="mt-3 block font-serif text-xl text-cream hover:text-gold"
                  >
                    05 24 66 49 74
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm6.4-8.4a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/gouts1_et_traditions"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block font-serif text-xl italic text-cream hover:text-gold"
                  >
                    @gouts1_et_traditions
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150} className="relative overflow-hidden bg-emerald-deep p-10 md:p-12">
            <div className="absolute inset-0 zellige-motif opacity-30" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <div>
                <span className="font-display text-[10px] tracking-[0.5em] text-gold uppercase">
                  Sur-Mesure
                </span>
                <h3 className="mt-4 font-display text-3xl text-cream leading-tight md:text-4xl">
                  Une pièce d'exception
                  <br />
                  <span className="italic font-serif text-gold">pour vos moments</span>
                </h3>
                <p className="mt-6 font-serif text-lg italic text-cream/80 leading-relaxed">
                  Anniversaire, mariage, réception privée — nous créons plateaux
                  prestige et gâteaux glacés à votre image. Contactez-nous directement
                  sur WhatsApp pour un service personnalisé.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-between border border-gold px-8 py-5 font-display text-[11px] tracking-[0.35em] text-gold uppercase transition-all hover:bg-gold hover:text-emerald-deep"
              >
                <span>Ouvrir WhatsApp</span>
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M4 10h12M12 5l5 5-5 5" strokeWidth="1.5" strokeLinecap="square" />
                </svg>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-gold/15 bg-ink py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo className="h-24 w-auto" />
            <p className="mt-6 max-w-md font-serif text-lg italic text-cream/70">
              L'Art de la Glace Artisanale — au cœur de Safi, une invitation au voyage
              des sens.
            </p>
          </div>

          <div>
            <p className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">
              Navigation
            </p>
            <ul className="mt-4 space-y-2 text-cream/70">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[10px] tracking-[0.3em] text-gold uppercase">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-cream/70">
              <li>Avenue Moulay Youssef, Safi</li>
              <li>
                <a href="tel:+212524664974" className="hover:text-gold">
                  05 24 66 49 74
                </a>
              </li>
              <li>10h00 — 23h00</li>
              <li>
                <a
                  href="https://instagram.com/gouts1_et_traditions"
                  target="_blank"
                  rel="noreferrer"
                  className="italic hover:text-gold"
                >
                  @gouts1_et_traditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gold/10 pt-8 md:flex-row">
          <p className="text-[10px] tracking-[0.3em] text-cream/40 uppercase">
            © {new Date().getFullYear()} Goût &amp; Traditions · Safi, Maroc
          </p>
          <p className="font-display text-[10px] tracking-[0.35em] text-gold/70 uppercase">
            Maison Artisanale
          </p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      <span className="hidden rounded-full bg-emerald-deep/90 px-4 py-2 font-display text-[10px] tracking-[0.3em] text-gold uppercase shadow-lg backdrop-blur-md md:inline-flex border border-gold/30">
        Nous écrire
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-deep border border-gold/40 text-gold shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-transform group-hover:scale-110">
        <span className="absolute inset-0 rounded-full bg-gold/20 animate-ping" />
        <svg viewBox="0 0 24 24" fill="currentColor" className="relative h-6 w-6">
          <path d="M.06 24l1.68-6.16A11.87 11.87 0 010.14 12C.14 5.44 5.48.1 12.03.1c3.18 0 6.17 1.24 8.42 3.49a11.82 11.82 0 013.48 8.42c0 6.56-5.34 11.9-11.9 11.9a11.9 11.9 0 01-5.68-1.45L.06 24zm6.3-4.14c1.56.93 3.17 1.42 4.84 1.43 5.4 0 9.8-4.39 9.8-9.8 0-2.62-1.02-5.08-2.87-6.94a9.75 9.75 0 00-6.93-2.88C5.79 1.67 1.4 6.07 1.4 11.47c0 1.73.46 3.42 1.33 4.89l-1.03 3.77 3.87-1.01zm11.37-7.41c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.17.2-.35.23-.65.08-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.47.13-.62.14-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.64-.93-2.24-.24-.6-.5-.52-.68-.53h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.52 0 1.49 1.08 2.93 1.23 3.13.15.2 2.13 3.26 5.17 4.56.72.31 1.29.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.44.25-.7.25-1.31.18-1.44-.08-.13-.28-.2-.58-.35z" />
        </svg>
      </span>
    </a>
  );
}

function HomePage() {
  return (
    <main className="relative bg-ink text-cream">
      <Nav />
      <Hero />
      <Histoire />
      <Carte />
      <Galerie />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
