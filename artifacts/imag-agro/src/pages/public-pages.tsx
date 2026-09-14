import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  MessageCircle,
  MoveRight,
  Sprout,
  Wheat,
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { publishedArticles, getArticle } from "@/content/articles";
import { brands, siteConfig } from "@/content/site";
import { getService, services } from "@/content/services";
import { photos, servicePhotos, type SitePhoto } from "@/content/media";
import { Breadcrumb, PageFrame } from "@/components/site-shell";

const assetBase = import.meta.env.BASE_URL;
const assetUrl = (path: string) => `${assetBase}${path}`;
const serviceWhatsAppLink = (serviceName: string) => `${siteConfig.whatsappLink}?text=${encodeURIComponent(`Hola, quiero consultar por ${serviceName}.`)}`;

function Photo({
  photo,
  className = "",
  eager = false,
}: {
  photo: SitePhoto;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={assetUrl(photo.src)}
      alt={photo.alt}
      className={`site-photo ${className}`}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
    />
  );
}

function LogoSeal({
  className = "",
  label = "Logo de IMAG AGRO",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span className={`logo-seal ${className}`}>
      <img src={`${assetBase}brand/imag-logo.webp`} alt={label} />
    </span>
  );
}

function PhotoTag({ children }: { children: ReactNode }) {
  return <span className="photo-tag">{children}</span>;
}

function SectionIntro({
  eyebrow,
  title,
  children,
  action,
  number,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
  number?: string;
}) {
  return (
    <div className="section-intro mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="flex gap-5">
        {number && (
          <span className="section-number hidden font-mono text-xs text-[hsl(var(--destructive))] md:block">
            {number}
          </span>
        )}
        <div>
          <p className="eyebrow text-[hsl(var(--destructive))]">{eyebrow}</p>
          <h2 className="mt-4 max-w-2xl text-balance font-display text-4xl leading-[1.02] text-[hsl(var(--primary))] md:text-6xl">
            {title}
          </h2>
          {children && (
            <div className="mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[hsl(var(--muted-foreground))]">
              {children}
            </div>
          )}
        </div>
      </div>
      {action}
    </div>
  );
}

function setMeta(name: string, content: string) {
  const tag = document.querySelector(`meta[name="${name}"]`);
  tag?.setAttribute("content", content);
}

function setProperty(property: string, content: string) {
  const tag = document.querySelector(`meta[property="${property}"]`);
  tag?.setAttribute("content", content);
}

function usePageMeta(
  title: string,
  description: string,
  image = photos.hero.src,
) {
  useEffect(() => {
    document.title = `${title} | IMAG AGRO SAS`;
    setMeta("description", description);
    setProperty("og:title", `${title} | IMAG AGRO SAS`);
    setProperty("og:description", description);
    setProperty("og:image", assetUrl(image));
    setMeta("twitter:title", `${title} | IMAG AGRO SAS`);
    setMeta("twitter:description", description);
    setMeta("twitter:image", assetUrl(image));
  }, [description, image, title]);
}

function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-float"
      aria-label="Escribir por WhatsApp"
      data-testid="link-floating-whatsapp"
    >
      <MessageCircle className="h-4 w-4" />
      <span>WhatsApp</span>
    </a>
  );
}

function FieldNote({ children }: { children: ReactNode }) {
  return (
    <div className="field-note">
      <span className="eyebrow text-[hsl(var(--accent))]">
        Desde el contexto
      </span>
      <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--primary-foreground))]/80">
        {children}
      </p>
    </div>
  );
}

function ServicePhotoCard({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const service = getService(slug);
  const photo = servicePhotos[slug];
  if (!service || !photo) return null;
  return (
    <Link
      href={`/soluciones/${slug}`}
      className={`photo-service-card group ${className}`}
      data-testid={`link-photo-service-${slug}`}
    >
      <Photo photo={photo} className="absolute inset-0 h-full w-full" />
      <div className="photo-service-card__overlay" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white md:p-7">
        <div className="flex items-start justify-between">
          <PhotoTag>
            {service.number} · {service.name}
          </PhotoTag>
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </div>
        <div>
          <h3 className="max-w-sm font-display text-3xl leading-none md:text-4xl">
            {service.name}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
            {service.short}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[hsl(var(--accent))]">
            Ver solución <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function HomePage() {
  usePageMeta(
    "Soluciones agropecuarias que producen resultados",
    "Combinamos conocimiento técnico, gestión y cercanía para ayudarte a elegir, planificar y producir con mayor claridad.",
  );
  const [finder, setFinder] = useState("");
  const recommended = useMemo(
    () =>
      services
        .filter((service) => {
          if (!finder) return true;
          const terms: Record<string, string[]> = {
            producir: ["semillas", "insumos", "forrajes"],
            vender: ["hacienda", "granos-y-back-office"],
            ordenar: ["granos-y-back-office", "campos"],
            invertir: ["campos", "genetica-bovina"],
            ganado: ["genetica-bovina", "hacienda", "forrajes"],
          };
          return terms[finder]?.includes(service.slug) ?? true;
        })
        .slice(0, 4),
    [finder],
  );

  return (
    <PageFrame>
      <section className="hero-home">
        <Photo
          photo={photos.hero}
          className="absolute inset-0 h-full w-full"
          eager
        />
        <div className="hero-home__wash" />
           <div className="container-wide relative z-10 grid min-h-[580px] items-end gap-8 py-10 md:grid-cols-[1.08fr_.92fr] md:py-12">
          <div className="hero-copy reveal">
            <p className="eyebrow text-[hsl(var(--accent))]">
              IMAG AGRO SAS · Soluciones integrales para el agro
            </p>
            <h1 className="mt-7 max-w-3xl font-display text-6xl leading-[.91] text-white md:text-8xl">
              Cada decisión del campo,{" "}
              <em className="text-[hsl(var(--accent))]">mejor acompañada.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              Combinamos conocimiento técnico, gestión y cercanía para ayudarte
              a elegir, planificar y producir con mayor claridad.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 bg-[hsl(var(--accent))] px-5 py-3.5 font-bold text-[hsl(var(--foreground))] transition-transform hover:-translate-y-0.5"
                data-testid="link-hero-whatsapp"
              >
                Hablemos por WhatsApp <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/soluciones"
                className="flex items-center gap-2 border border-white/45 px-5 py-3.5 text-sm font-bold text-white transition-colors hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                data-testid="link-hero-soluciones"
              >
                Conocé nuestras soluciones <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/25 pt-5 text-[.66rem] font-bold uppercase tracking-[.16em] text-white/65">
              <span>Producción</span>
              <span>Genética</span>
              <span>Comercialización</span>
              <span>Gestión</span>
            </div>
          </div>
          <div className="hero-side reveal reveal-delay-2">
            <LogoSeal className="hero-logo" />
            <div className="hero-signature">
              <span className="eyebrow text-[hsl(var(--accent))]">
                Una forma de estar
              </span>
              <p className="mt-3 font-display text-3xl leading-none text-white md:text-4xl">
                Soluciones que producen resultados.
              </p>
            </div>
          </div>
        </div>
        <div className="container-wide relative z-10 flex items-center gap-3 pb-7 text-[.68rem] font-bold uppercase tracking-[.16em] text-white/60">
          <ArrowDown className="h-4 w-4 text-[hsl(var(--accent))]" /> Deslizá
          para conocer IMAG AGRO
        </div>
      </section>

      <section className="container-wide py-24 md:py-32">
        <SectionIntro
          eyebrow="Una mirada completa"
          title="Más que productos, soluciones para producir."
          number="01"
          action={
            <Link
              href="/soluciones"
              className="group flex items-center gap-2 border-b border-[hsl(var(--primary))] pb-2 text-sm font-bold text-[hsl(var(--primary))]"
              data-testid="link-home-all-solutions"
            >
              Ver todas las soluciones{" "}
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        >
          Cada campo tiene una realidad distinta. Trabajamos donde una buena
          lectura puede ordenar lo que viene: producción, comercialización y
          operación.
        </SectionIntro>
        <div className="solution-mosaic">
          <ServicePhotoCard slug="semillas" className="solution-mosaic__lead" />
          <ServicePhotoCard slug="genetica-bovina" />
          <ServicePhotoCard slug="granos-y-back-office" />
          <ServicePhotoCard slug="forrajes" />
        </div>
      </section>

      <section className="bg-[hsl(var(--secondary))] py-24 md:py-32">
        <div className="container-wide">
          <SectionIntro
            eyebrow="Un punto de partida"
            title="¿Qué necesitás resolver?"
            number="02"
            action={
              <p className="hidden max-w-[210px] text-right text-xs leading-relaxed text-[hsl(var(--muted-foreground))] md:block">
                Elegí una situación y te mostramos por dónde empezar la
                conversación.
              </p>
            }
          />
          <div className="flex flex-wrap gap-2 border-b border-[hsl(var(--border))] pb-7">
            {[
              ["producir", "Quiero producir"],
              ["ganado", "Estoy pensando en ganado"],
              ["vender", "Necesito vender"],
              ["ordenar", "Quiero ordenar"],
              ["invertir", "Estoy buscando invertir"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFinder(finder === value ? "" : value)}
                className={`border px-4 py-3 text-sm transition-colors ${finder === value ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" : "border-[hsl(var(--border))] bg-[hsl(var(--background))] hover:border-[hsl(var(--primary))]"}`}
                data-testid={`button-finder-${value}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-0 md:grid-cols-2">
            {recommended.map((service) => (
              <Link
                key={service.slug}
                href={`/soluciones/${service.slug}`}
                className="group flex items-start justify-between border-b border-[hsl(var(--border))] py-5"
                data-testid={`link-recommended-${service.slug}`}
              >
                <div>
                  <span className="eyebrow text-[hsl(var(--destructive))]">
                    {service.number}
                  </span>
                  <h3 className="mt-2 font-display text-2xl text-[hsl(var(--primary))]">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                    {service.short}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 text-[hsl(var(--primary))] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="como-trabajamos"
        className="container-wide grid gap-12 py-24 md:grid-cols-[.84fr_1.16fr] md:py-32"
      >
        <div className="method-visual">
          <Photo photo={photos.soil} className="h-full w-full" />
          <div className="method-visual__caption">
            <span className="eyebrow text-[hsl(var(--accent))]">
              Experiencia de campo
            </span>
            <p className="mt-3 font-display text-2xl leading-none text-white">
              Primero entendemos. Después recomendamos.
            </p>
          </div>
        </div>
        <div>
          <p className="eyebrow text-[hsl(var(--destructive))]">
            Así trabajamos · 03
          </p>
          <h2 className="mt-4 max-w-xl font-display text-5xl leading-[1.02] text-[hsl(var(--primary))] md:text-6xl">
            Cerca del productor, desde la consulta hasta el resultado.
          </h2>
          <div className="mt-10 grid gap-0 border-t border-[hsl(var(--border))]">
            {[
              [
                "01",
                "Escuchamos",
                "Nos metemos en la situación concreta: el lote, el rodeo, la entrega, el papel que falta.",
              ],
              [
                "02",
                "Evaluamos",
                "Traducimos datos y alternativas para conversar lo importante, sin vueltas.",
              ],
              [
                "03",
                "Acompañamos",
                "Una buena decisión también necesita saber qué hacer después y cuándo volver a mirar.",
              ],
            ].map(([number, title, copy]) => (
              <div
                key={number}
                className="grid grid-cols-[54px_1fr] gap-5 border-b border-[hsl(var(--border))] py-7"
              >
                <span className="font-mono text-xs text-[hsl(var(--destructive))]">
                  {number}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-[hsl(var(--primary))]">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="marcas"
        className="bg-[hsl(var(--primary))] py-24 text-[hsl(var(--primary-foreground))] md:py-28"
      >
        <div className="container-wide grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]">
              Marcas y alianzas
            </p>
            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.04] md:text-6xl">
              Una red para ampliar la conversación.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-[hsl(var(--primary-foreground))]/65">
              Trabajamos con un portfolio de marcas y alianzas que conocemos y
              podemos poner en contexto. Sin promesas de exclusividad: con
              criterio para cada necesidad.
            </p>
          </div>
          <div className="grid grid-cols-1 border-y border-[hsl(var(--sidebar-border))]">
            {brands.map((brand, index) => (
              <div
                key={brand}
                className="flex items-center justify-between border-b border-[hsl(var(--sidebar-border))] py-5 last:border-b-0"
              >
                <span className="font-display text-3xl">{brand}</span>
                <span className="eyebrow text-[hsl(var(--accent))]">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide py-24 md:py-32">
        <SectionIntro
          eyebrow="Para seguir pensando"
          title="Información para productores"
          number="04"
          action={
            <Link
              href="/informacion"
              className="group flex items-center gap-2 border-b border-[hsl(var(--primary))] pb-2 text-sm font-bold text-[hsl(var(--primary))]"
              data-testid="link-home-information"
            >
              Ver toda la información{" "}
              <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="article-feature-grid">
          {publishedArticles.slice(0, 3).map((article, index) => {
            const articlePhoto =
              index === 0
                ? photos.cattle
                : index === 1
                  ? photos.tractor
                  : photos.fieldRows;
            return (
              <Link
                key={article.slug}
                href={`/informacion/${article.slug}`}
                className={`article-card group ${index === 0 ? "article-card--lead" : ""}`}
                data-testid={`link-home-article-${article.slug}`}
              >
                <div className="article-card__image">
                  <Photo photo={articlePhoto} />
                  <div className="photo-service-card__overlay" />
                </div>
                <div className="relative z-10 mt-5">
                  <p className="eyebrow text-[hsl(var(--destructive))]">
                    {article.category}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-[1.03] text-[hsl(var(--primary))] transition-colors group-hover:text-[hsl(var(--destructive))]">
                    {article.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {article.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--primary))]">
                    {article.readingTime} <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="cta-photo">
        <Photo photo={photos.farm} className="absolute inset-0 h-full w-full" />
        <div className="cta-photo__overlay" />
        <div className="container-wide relative z-10 flex flex-col gap-8 py-24 md:flex-row md:items-end md:justify-between md:py-32">
          <div>
            <p className="eyebrow text-[hsl(var(--accent))]">
              Cuando quieras, lo conversamos
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-5xl leading-[.98] text-white md:text-7xl">
              Contanos qué necesitás. Lo vemos juntos.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <LogoSeal className="cta-logo" />
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="group flex w-fit items-center gap-3 border border-white px-5 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[hsl(var(--primary))]"
              data-testid="link-home-contacto"
            >
              Hablemos por WhatsApp{" "}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>
      <WhatsAppFloat />
    </PageFrame>
  );
}

export function SolutionsPage() {
  usePageMeta(
    "Soluciones para el campo real",
    "Conocé las áreas de IMAG AGRO: semillas, genética bovina, insumos, forrajes, materias primas, hacienda, campos y granos.",
  );
  const [filter, setFilter] = useState("Todas");
  const categories = [
    "Todas",
    "Producción",
    "Ganadería",
    "Comercial",
    "Gestión",
  ];
  const categoryFor = (slug: string) =>
    slug.includes("genetica") || slug === "hacienda" || slug === "forrajes"
      ? "Ganadería"
      : slug.includes("granos") || slug === "campos"
        ? "Comercial"
        : "Producción";
  const visible = services.filter(
    (service) => filter === "Todas" || categoryFor(service.slug) === filter,
  );
  return (
    <PageFrame>
      <div className="container-wide py-16 md:py-24">
        <Breadcrumb current="Soluciones" />
        <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-[hsl(var(--destructive))]">
              Una conversación, varias puertas
            </p>
            <h1 className="mt-5 font-display text-6xl leading-[.95] text-[hsl(var(--primary))] md:text-8xl">
              Soluciones para el campo real.
            </h1>
          </div>
          <div className="md:pt-12">
            <p className="max-w-lg text-xl leading-relaxed text-[hsl(var(--muted-foreground))]">
              No todo problema necesita el mismo camino. Conocé las áreas en las
              que podemos acompañarte y encontrá la que mejor describe tu
              momento.
            </p>
          </div>
        </div>
        <div className="mt-20 flex flex-wrap gap-2 border-b border-[hsl(var(--border))] pb-4">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 text-sm ${filter === category ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" : "border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"}`}
              data-testid={`button-filter-${category.toLowerCase()}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="solutions-editorial-grid mt-8">
          {visible.map((service, index) => (
            <Link
              href={`/soluciones/${service.slug}`}
              key={service.slug}
              className={`solution-list-card group ${index === 0 ? "solution-list-card--feature" : ""}`}
              data-testid={`link-service-${service.slug}`}
            >
              <div className="solution-list-card__image">
                <Photo photo={servicePhotos[service.slug]} />
                <div className="photo-service-card__overlay" />
                <span className="photo-tag absolute left-5 top-5 z-10">
                  {service.number} · {categoryFor(service.slug)}
                </span>
              </div>
              <div className="pt-5">
                <div className="flex items-start justify-between">
                  <h2 className="max-w-md font-display text-3xl leading-[1.04] text-[hsl(var(--primary))] group-hover:text-[hsl(var(--destructive))]">
                    {service.name}
                  </h2>
                  <ArrowUpRight className="h-5 w-5 text-[hsl(var(--primary))] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <p className="mt-3 max-w-md leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {service.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">
                  Ver cómo acompañamos <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <WhatsAppFloat />
    </PageFrame>
  );
}

export function ServicePage({ slug }: { slug?: string }) {
  const service = getService(slug);
  const photo = slug ? servicePhotos[slug] : photos.hero;
  usePageMeta(
    service ? service.name : "Soluciones",
    service?.description ??
      "Soluciones agropecuarias para productores y empresas.",
    photo.src,
  );
  if (!service) return <NotFoundPage />;
  const ctaLabel =
    service.slug === "granos-y-back-office"
      ? "Necesito ordenar una operación"
      : service.slug === "hacienda"
        ? "Consultar por hacienda"
        : service.slug === "genetica-bovina"
          ? "Hablar sobre genética"
          : `Consultar por ${service.name.toLowerCase()}`;
  return (
    <PageFrame>
      <section className="service-hero">
        <Photo photo={photo} className="absolute inset-0 h-full w-full" />
        <div className="service-hero__overlay" />
        <div className="container-wide relative z-10 py-16 text-white md:py-24">
          <Breadcrumb current={service.name} />
          <div className="grid gap-12 md:grid-cols-[.95fr_1.05fr] md:items-end">
            <div>
              <p className="eyebrow text-[hsl(var(--accent))]">
                Solución {service.number} · {photo.role}
              </p>
              <h1 className="mt-5 max-w-2xl font-display text-6xl leading-[.95] md:text-8xl">
                {service.name}
              </h1>
            </div>
            <p className="max-w-lg text-xl leading-relaxed text-white/80">
              {service.description}
            </p>
          </div>
          <a
            href={serviceWhatsAppLink(service.name)}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex items-center gap-3 bg-[hsl(var(--accent))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--foreground))]"
            data-testid="link-service-whatsapp"
          >
            {ctaLabel} <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      <section className="container-wide grid gap-16 py-20 md:grid-cols-[.9fr_1.1fr] md:py-28">
        <div className="service-detail-photo">
          <Photo photo={photo} />
          <PhotoTag>{service.name} · en contexto</PhotoTag>
        </div>
        <div>
          <p className="eyebrow text-[hsl(var(--destructive))]">En contexto</p>
          <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.02] text-[hsl(var(--primary))]">
            La mejor respuesta depende de la pregunta correcta.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
            {service.detail}
          </p>
        </div>
      </section>
      <section className="bg-[hsl(var(--secondary))] py-20">
        <div className="container-wide">
          <p className="eyebrow text-[hsl(var(--destructive))]">
            Para empezar la charla
          </p>
          <h2 className="mt-4 font-display text-4xl text-[hsl(var(--primary))]">
            Tres preguntas que nos ayudan a entender
          </h2>
          <div className="mt-10 grid gap-0 border-t border-[hsl(var(--border))] md:grid-cols-3">
            {service.questions.map((question, index) => (
              <div
                className="border-b border-[hsl(var(--border))] py-7 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
                key={question}
              >
                <span className="font-mono text-xs text-[hsl(var(--destructive))]">
                  0{index + 1}
                </span>
                <p className="mt-5 font-display text-2xl leading-tight text-[hsl(var(--primary))]">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-wide py-20">
        <div className="border-t border-[hsl(var(--border))] pt-8">
          <p className="eyebrow text-[hsl(var(--destructive))]">Qué conviene tener a mano</p>
          <h2 className="mt-4 font-display text-4xl text-[hsl(var(--primary))]">Un poco de contexto ayuda a empezar mejor.</h2>
          <ul className="mt-8 grid gap-3 text-[hsl(var(--muted-foreground))] md:grid-cols-2">
            {['Zona o localidad', 'Necesidad concreta', 'Superficie, lote o escala, cuando aplique', 'Momento de compra o decisión', 'Datos técnicos relevantes'].map((item) => <li key={item} className="border-b border-[hsl(var(--border))] py-3">{item}</li>)}
          </ul>
        </div>
      </section>
      <section className="container-wide py-20">
        <div className="flex flex-col gap-6 border-t border-[hsl(var(--border))] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-display text-3xl text-[hsl(var(--primary))]">
            ¿Querés contarnos un poco más de tu situación?
          </p>
          <a
            href={serviceWhatsAppLink(service.name)}
            target="_blank"
            rel="noreferrer"
            className="flex w-fit items-center gap-2 border-b border-[hsl(var(--primary))] pb-2 text-sm font-bold"
            data-testid="link-service-bottom-contacto"
          >
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      <WhatsAppFloat />
    </PageFrame>
  );
}

export function InformationPage() {
  usePageMeta(
    "Información para productores",
    "Ideas y preguntas para mirar producción, negocio y operación con un poco más de claridad.",
  );
  const [category, setCategory] = useState("Todas");
  const categories = [
    "Todas",
    "Agricultura",
    "Ganadería",
    "Mercados",
    "Clima",
    "Gestión",
  ];
  const visible = publishedArticles.filter(
    (article) => category === "Todas" || article.category === category,
  );
  const photoFor = (index: number) =>
    [photos.cattle, photos.tractor, photos.fieldRows][index % 3];
  return (
    <PageFrame>
      <div className="container-wide py-16 md:py-24">
        <Breadcrumb current="Información" />
        <div className="max-w-3xl">
          <p className="eyebrow text-[hsl(var(--destructive))]">
            Información para productores
          </p>
          <h1 className="mt-5 font-display text-6xl leading-[.95] text-[hsl(var(--primary))] md:text-8xl">
            Pensar el campo también es parte del trabajo.
          </h1>
          <p className="mt-7 max-w-xl text-xl leading-relaxed text-[hsl(var(--muted-foreground))]">
            Ideas y preguntas para mirar producción, negocio y operación con un
            poco más de claridad.
          </p>
        </div>
        <div className="mt-20 flex flex-wrap gap-2 border-b border-[hsl(var(--border))] pb-4">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`px-4 py-2 text-sm ${category === item ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" : "border border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]"}`}
              data-testid={`button-article-filter-${item.toLowerCase()}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="information-grid mt-8">
          {visible.length ? visible.map((article, index) => (
            <Link
              href={`/informacion/${article.slug}`}
              className={`information-card group ${index === 0 ? "information-card--feature" : ""}`}
              key={article.slug}
              data-testid={`link-article-${article.slug}`}
            >
              <div className="information-card__image">
                <Photo photo={photoFor(index)} />
                <div className="photo-service-card__overlay" />
              </div>
              <div className="pt-5">
                <div className="flex items-start justify-between gap-4">
                  <p className="eyebrow text-[hsl(var(--destructive))]">
                    {article.category}
                  </p>
                </div>
                <h2 className="mt-4 font-display text-3xl leading-[1.03] text-[hsl(var(--primary))] group-hover:text-[hsl(var(--destructive))]">
                  {article.title}
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {article.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[hsl(var(--primary))]">
                  {article.readingTime} <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )) : <p className="border-t border-[hsl(var(--border))] pt-6 text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">Estamos preparando materiales técnicos para publicar con fuentes y fecha de validación.</p>}
        </div>
      </div>
      <WhatsAppFloat />
    </PageFrame>
  );
}

export function ArticlePage({ slug }: { slug?: string }) {
  const article = getArticle(slug);
  const photo =
    slug?.includes("ganadero") || slug?.includes("hacienda")
      ? photos.cattle
      : slug?.includes("granos")
        ? photos.tractor
        : slug?.includes("hibrido")
          ? photos.fieldRows
          : photos.cattle;
  usePageMeta(
    article ? article.title : "Información",
    article?.excerpt ?? "Información para productores agropecuarios.",
    photo.src,
  );
  if (!article) return <NotFoundPage />;
  return (
    <PageFrame>
      <article className="container-wide py-16 md:py-24">
        <Breadcrumb current={article.title} />
        <div className="article-detail-hero">
          <div className="max-w-4xl">
            <p className="eyebrow text-[hsl(var(--destructive))]">
              {article.category}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[1] text-[hsl(var(--primary))] md:text-7xl">
              {article.title}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-[hsl(var(--muted-foreground))]">
              {article.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-[hsl(var(--muted-foreground))]">
              <span>{article.readingTime}</span>
            </div>
          </div>
          <div className="article-detail-hero__image">
            <Photo photo={photo} />
          </div>
        </div>
        <div className="mt-14 grid gap-14 md:grid-cols-[1fr_280px]">
          <div className="max-w-2xl border-t border-[hsl(var(--border))] pt-10">
            {article.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-7 font-display text-2xl leading-relaxed text-[hsl(var(--primary))]"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <aside className="h-fit border-t border-[hsl(var(--border))] pt-6">
            <p className="eyebrow text-[hsl(var(--destructive))]">
              Seguí leyendo
            </p>
            <div className="mt-5 space-y-5">
              {publishedArticles
                .filter((item) => item.slug !== article.slug)
                .slice(0, 3)
                .map((item) => (
                  <Link
                    href={`/informacion/${item.slug}`}
                    key={item.slug}
                    className="group block"
                    data-testid={`link-related-${item.slug}`}
                  >
                    <p className="font-display text-xl leading-tight text-[hsl(var(--primary))] group-hover:text-[hsl(var(--destructive))]">
                      {item.title}
                    </p>
                    <span className="mt-2 inline-flex text-xs text-[hsl(var(--muted-foreground))]">
                      {item.category}
                    </span>
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </article>
      <WhatsAppFloat />
    </PageFrame>
  );
}

export function AboutPage() {
  usePageMeta(
    "Nosotros",
    "IMAG AGRO es una empresa argentina de soluciones agropecuarias que conecta la realidad productiva con el próximo paso.",
  );
  return (
    <PageFrame>
      <section className="about-hero">
        <div className="container-wide grid gap-12 py-16 md:grid-cols-[.95fr_1.05fr] md:items-end md:py-24">
          <div>
            <Breadcrumb current="Nosotros" />
            <LogoSeal className="about-logo" />
            <h1 className="mt-8 font-display text-6xl leading-[.95] text-white md:text-8xl">
              Cerca del campo. Claros al decidir.
            </h1>
          </div>
          <div>
            <Photo photo={photos.fieldRows} className="about-hero__image" />
            <p className="mt-5 max-w-md text-xl leading-relaxed text-white/70">
              IMAG AGRO es una empresa argentina de soluciones agropecuarias.
              Construimos conversaciones que conectan la realidad productiva con
              el próximo paso.
            </p>
          </div>
        </div>
      </section>
      <section className="container-wide grid gap-14 py-24 md:grid-cols-[1fr_1fr] md:py-32">
        <div className="about-photo-stack">
          <Photo photo={photos.cattleDetail} />
          <span className="photo-tag absolute bottom-5 left-5">
            Cercanía · criterio · continuidad
          </span>
        </div>
        <div>
          <p className="eyebrow text-[hsl(var(--destructive))]">
            Lo que nos mueve
          </p>
          <h2 className="mt-5 font-display text-5xl leading-[1.02] text-[hsl(var(--primary))]">
            La cercanía no es una pose. Es una forma de trabajar.
          </h2>
          <p className="mt-7 leading-relaxed text-[hsl(var(--muted-foreground))]">
            Preferimos conocer el contexto antes de ofrecer una respuesta.
            Preguntar antes de asumir. Volver sobre lo conversado cuando el
            campo cambia. Así se construye una relación útil: con presencia,
            criterio y respeto por cada realidad.
          </p>
          <p className="mt-5 leading-relaxed text-[hsl(var(--muted-foreground))]">
            Trabajamos con escucha, contexto y seguimiento para que cada conversación se transforme en un próximo paso claro.
          </p>
        </div>
      </section>
      <section className="container-wide py-20">
        <div className="border-t border-[hsl(var(--border))] pt-8">
          <p className="eyebrow text-[hsl(var(--destructive))]">Quién está detrás</p>
          <div className="mt-6 grid gap-8 md:grid-cols-[220px_1fr] md:items-center">
            <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--secondary))] text-center text-sm text-[hsl(var(--muted-foreground))]">Fotografía del dueño o equipo</div>
            <div>
              <h2 className="font-display text-4xl text-[hsl(var(--primary))]">Una presentación real, cuando esté disponible.</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-[hsl(var(--muted-foreground))]">Este espacio queda preparado para sumar nombre, rol, fotografía y una presentación aprobada por IMAG AGRO.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[hsl(var(--secondary))] py-20">
        <div className="container-wide">
          <p className="eyebrow text-[hsl(var(--destructive))]">
            Principios de trabajo
          </p>
          <div className="mt-8 grid gap-0 border-t border-[hsl(var(--border))] md:grid-cols-3">
            {[
              [
                "Contexto",
                "La misma herramienta puede servir o no, según dónde y cuándo.",
              ],
              [
                "Claridad",
                "Lo importante tiene que poder explicarse sin rodeos.",
              ],
              [
                "Continuidad",
                "Una decisión mejora cuando alguien sigue ahí después.",
              ],
            ].map(([title, copy], index) => (
              <div
                key={title}
                className="border-b border-[hsl(var(--border))] py-8 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
              >
                <span className="font-mono text-xs text-[hsl(var(--destructive))]">
                  0{index + 1}
                </span>
                <h2 className="mt-6 font-display text-3xl text-[hsl(var(--primary))]">
                  {title}
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container-wide py-24">
        <div className="flex flex-col gap-8 border-t border-[hsl(var(--border))] pt-9 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-[hsl(var(--destructive))]">
              El próximo paso
            </p>
            <h2 className="mt-4 max-w-xl font-display text-5xl leading-[1] text-[hsl(var(--primary))]">
              Si hay una pregunta, ya hay por dónde empezar.
            </h2>
          </div>
          <Link
            href="/contacto"
            className="flex w-fit items-center gap-2 border-b border-[hsl(var(--primary))] pb-2 text-sm font-bold"
            data-testid="link-about-contacto"
          >
            Abrir una conversación <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <WhatsAppFloat />
    </PageFrame>
  );
}

export function ContactPage() {
  usePageMeta(
    "Contacto",
    "Contanos qué necesitás resolver y abrí una conversación directa con IMAG AGRO por WhatsApp.",
  );
  const [form, setForm] = useState({ name: "", subject: "", message: "" });
  const [started, setStarted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Hola, soy ${form.name}. Me gustaría consultar por ${form.subject}.\n\n${form.message}`;
    const target = `${siteConfig.whatsappLink}?text=${encodeURIComponent(message)}`;
    setStarted(true);
    window.open(target, "_blank", "noopener,noreferrer");
  };
  return (
    <PageFrame>
      <div className="container-wide py-16 md:py-24">
        <Breadcrumb current="Contacto" />
        <div className="grid gap-16 md:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow text-[hsl(var(--destructive))]">Hablemos</p>
            <h1 className="mt-5 font-display text-6xl leading-[.95] text-[hsl(var(--primary))] md:text-8xl">
              Contanos qué estás mirando.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
              No hace falta llegar con la respuesta. Con un poco de contexto,
              podemos encontrar una mejor pregunta y el camino para seguir.
            </p>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center gap-3 bg-[hsl(var(--primary))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--primary-foreground))]"
              data-testid="link-contacto-whatsapp"
            >
              <MessageCircle className="h-4 w-4" /> Escribir por WhatsApp
            </a>
            <div className="contact-proof mt-12">
              <Check className="h-4 w-4 text-[hsl(var(--accent))]" />
              <span>
                Una conversación directa, sin formularios que se pierden.
              </span>
            </div>
          </div>
          {siteConfig.whatsappNumber ? (
            <div className="border-t border-[hsl(var(--border))] pt-7">
              <p className="eyebrow text-[hsl(var(--destructive))]">
                Antes de abrir WhatsApp
              </p>
              <h2 className="mt-4 font-display text-3xl text-[hsl(var(--primary))]">
                Dejanos el contexto de tu consulta
              </h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <label className="block">
                  <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                    Tu nombre o empresa
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    className="mt-2 w-full border-0 border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 text-base outline-none focus:border-[hsl(var(--primary))]"
                    placeholder="¿Cómo te llamamos?"
                    data-testid="input-contact-name"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                    ¿Qué necesitás resolver?
                  </span>
                  <select
                    required
                    value={form.subject}
                    onChange={(event) =>
                      setForm({ ...form, subject: event.target.value })
                    }
                    className="mt-2 w-full border-0 border-b border-[hsl(var(--border))] bg-transparent px-0 py-3 text-base outline-none focus:border-[hsl(var(--primary))]"
                    data-testid="select-contact-subject"
                  >
                    <option value="">Elegí una opción</option>
                    {services.map((item) => (
                      <option value={item.name} key={item.slug}>
                        {item.name}
                      </option>
                    ))}
                    <option value="Otra consulta">Otra consulta</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-[hsl(var(--primary))]">
                    Un poco más de contexto
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    className="mt-2 w-full resize-y border border-[hsl(var(--border))] bg-transparent p-3 text-base outline-none focus:border-[hsl(var(--primary))]"
                    placeholder="Contanos lo que creas importante..."
                    data-testid="textarea-contact-message"
                  />
                </label>
                <button
                  type="submit"
                  className="flex items-center gap-3 bg-[hsl(var(--accent))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--foreground))]"
                  data-testid="button-contact-submit"
                >
                  Abrir WhatsApp con mi consulta{" "}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                {started && (
                  <p
                    className="border-l-2 border-[hsl(var(--accent))] bg-[hsl(var(--secondary))] p-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
                    role="status"
                  >
                    La consulta quedó en este dispositivo. WhatsApp se abrió
                    para que puedas continuar la conversación.
                  </p>
                )}
              </form>
            </div>
          ) : (
            <div className="contact-direct border-t border-[hsl(var(--border))] pt-7">
              <p className="eyebrow text-[hsl(var(--destructive))]">
                Canal directo
              </p>
              <h2 className="mt-4 font-display text-3xl text-[hsl(var(--primary))]">
                Escribinos por WhatsApp y contanos qué necesitás.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-[hsl(var(--muted-foreground))]">
                Escribinos y contanos qué necesitás. Te ayudamos a encontrar el mejor punto de partida.
              </p>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 border-b border-[hsl(var(--primary))] pb-2 text-sm font-bold text-[hsl(var(--primary))]"
                data-testid="link-contacto-whatsapp-secondary"
              >
                Abrir el canal directo <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </div>
      </div>
      <WhatsAppFloat />
    </PageFrame>
  );
}

export function NotFoundPage() {
  usePageMeta(
    "Página no encontrada",
    "No encontramos la dirección que buscabas. Volvé al inicio de IMAG AGRO.",
  );
  const [, setLocation] = useLocation();
  return (
    <PageFrame>
      <div className="container-wide flex min-h-[65vh] flex-col justify-center py-20">
        <p className="eyebrow text-[hsl(var(--destructive))]">
          404 · Camino no encontrado
        </p>
        <h1 className="mt-5 max-w-2xl font-display text-6xl leading-[.95] text-[hsl(var(--primary))] md:text-8xl">
          Esta página se fue al lote.
        </h1>
        <p className="mt-7 max-w-md text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
          No encontramos la dirección que buscabas. Podemos volver a empezar
          desde el campo.
        </p>
        <button
          type="button"
          onClick={() => setLocation("/")}
          className="mt-9 flex w-fit items-center gap-3 bg-[hsl(var(--primary))] px-5 py-3.5 text-sm font-bold text-[hsl(var(--primary-foreground))]"
          data-testid="button-404-home"
        >
          Volver al inicio <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <WhatsAppFloat />
    </PageFrame>
  );
}
