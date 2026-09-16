import { ArrowUpRight, FileText } from "lucide-react";
import { catalogConfig, siteConfig } from "@/content/site";

type Props = { compact?: boolean };

export function CatalogCards({ compact = false }: Props) {
  if (compact) {
    return <div className="grid gap-5 md:grid-cols-2">{catalogConfig.map((catalog) => <a key={catalog.title} href="/catalogos" className="catalog-preview group grid grid-cols-[96px_1fr] gap-5 p-4 md:grid-cols-[120px_1fr]">
      <div className="catalog-preview__cover"><img src={`${import.meta.env.BASE_URL}${catalog.cover}`} alt={`Portada del ${catalog.title}`} className="h-40 w-full object-contain" loading="lazy" width="900" height="1600" /></div>
      <div className="flex flex-col justify-center"><p className="eyebrow text-[hsl(var(--destructive))]">{catalog.brand}</p><h3 className="mt-2 font-display text-2xl text-[hsl(var(--primary))]">{catalog.title}</h3><p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{catalog.description.split(".")[0]}.</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[hsl(var(--primary))]">Explorar catálogos <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
    </a>)}</div>;
  }

  return <div className="grid gap-6 lg:grid-cols-2">{catalogConfig.map((catalog) => <article key={catalog.title} className={`catalog-card catalog-card--${catalog.brand === "Natalseeds" ? "natalseeds" : "las-lilas"}`}>
    <div className="grid md:grid-cols-[minmax(220px,.85fr)_1.15fr]"><div className="catalog-card__cover"><img src={`${import.meta.env.BASE_URL}${catalog.cover}`} alt={`Portada del ${catalog.title} de ${catalog.brand}`} className="h-[300px] w-full object-contain object-center transition-transform duration-300 group-hover:scale-[1.02] md:h-[340px]" loading="lazy" width="900" height="1600" /></div>
      <div className="flex flex-col p-6 md:p-8"><p className="eyebrow text-[hsl(var(--destructive))]">{catalog.brand}</p><h2 className="mt-3 font-display text-3xl leading-none text-[hsl(var(--primary))]">{catalog.title}</h2><p className="mt-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{catalog.description}</p><div className="mt-5 flex flex-wrap gap-2 text-xs text-[hsl(var(--muted-foreground))]">{catalog.categories.map((item) => <span key={item} className="border border-[hsl(var(--border))] px-2 py-1">{item}</span>)}</div><p className="mt-auto flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[.12em] text-[hsl(var(--primary))]"><FileText className="h-4 w-4 text-[hsl(var(--destructive))]" /> PDF oficial · {catalog.pages}</p></div>
    </div><div className="flex flex-col gap-4 border-t border-[hsl(var(--border))] px-6 py-5 sm:flex-row sm:flex-wrap sm:items-center md:px-8"><a href={catalog.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[hsl(var(--primary))] px-4 py-3 text-sm font-bold text-[hsl(var(--primary-foreground))] transition-transform duration-300 hover:-translate-y-0.5">Ver catálogo PDF <ArrowUpRight className="h-4 w-4" /></a><a href={`${siteConfig.whatsappLink}?text=${encodeURIComponent(catalog.message)}`} target="_blank" rel="noreferrer" className="text-center text-sm font-bold text-[hsl(var(--primary))] underline decoration-[hsl(var(--accent))] underline-offset-4">Consultar con IMAG</a><p className="w-full text-xs text-[hsl(var(--muted-foreground))]">El PDF se abre en una pestaña nueva y desde allí puede descargarse.</p></div>
  </article>)}</div>;
}
