import { useEffect, useState } from "react";
import { ArrowUpRight, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { marketSources } from "@/content/site";
import { marketFallbackMessage, type MarketData } from "@/lib/market";

const cacheKey = "imag-market-last-success";
const value = (item: string | number | undefined) => item === undefined ? "Sin publicar" : String(item);

function Sources() {
  return <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[hsl(var(--muted-foreground))]">Fuentes: {marketSources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="underline decoration-[hsl(var(--accent))] underline-offset-4 hover:text-[hsl(var(--primary))]">{source.label}</a>)}</div>;
}

function MarketSkeleton() {
  return <div className="grid animate-pulse gap-4 md:grid-cols-3"><div className="h-36 bg-[hsl(var(--muted))]" /><div className="h-36 bg-[hsl(var(--muted))]" /><div className="h-36 bg-[hsl(var(--muted))]" /></div>;
}

export function MarketSection({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem(cacheKey);
    if (cached) { try { setData(JSON.parse(cached) as MarketData); } catch { localStorage.removeItem(cacheKey); } }
    fetch("/api/market", { headers: { Accept: "application/json" } })
      .then((response) => response.ok ? response.json() as Promise<MarketData> : Promise.reject(new Error("market")))
      .then((next) => { if (next.status === "live" || next.status === "stale") { setData(next); localStorage.setItem(cacheKey, JSON.stringify(next)); } else if (!cached) setData(null); })
      .catch(() => { setFailed(true); setData((current) => current ? { ...current, status: "stale" } : null); })
      .finally(() => setLoading(false));
  }, []);

  if (loading && !data) return <MarketSkeleton />;
  if (!data) return <div className="border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8"><p className="font-display text-2xl text-[hsl(var(--primary))]">{failed ? "No pudimos actualizar los valores en este momento." : "Todavía no publicamos los valores de esta jornada."}</p><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">Mientras actualizamos la información, podés consultar las fuentes oficiales o escribirnos para revisar una operación.</p><div className="mt-6 flex flex-wrap gap-3"><a href={marketSources[0].url} target="_blank" rel="noopener noreferrer" className="border border-[hsl(var(--border))] px-4 py-3 text-sm font-bold">Consultar MAG</a><a href={marketSources[1].url} target="_blank" rel="noopener noreferrer" className="border border-[hsl(var(--border))] px-4 py-3 text-sm font-bold">Consultar Pizarra Rosario</a><Link href="/contacto" className="bg-[hsl(var(--accent))] px-4 py-3 text-sm font-bold text-[hsl(var(--foreground))]">Hablar con IMAG</Link></div><Sources /></div>;

  const highlighted = data.grains.slice(0, compact ? 3 : data.grains.length);
  return <div>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-[hsl(var(--muted-foreground))]"><span>Jornada del {data.marketDate}</span><span className={data.status === "stale" ? "text-[hsl(var(--destructive))]" : "text-[hsl(var(--primary))]"}>{data.status === "stale" ? `Mostrando la última actualización disponible: ${data.marketDate}.` : `Actualizado ${data.updatedAt}`}</span></div>
    <div className={`grid gap-4 ${compact ? "md:grid-cols-3" : "md:grid-cols-[1.1fr_1fr_1fr]"}`}>
      {data.inmag && <article className="border border-[hsl(var(--accent))] bg-[hsl(var(--primary))] p-6 text-[hsl(var(--primary-foreground))] md:p-8"><p className="eyebrow text-[hsl(var(--accent))]">INMAG</p><p className="mt-5 font-display text-4xl tabular-nums md:text-5xl">{value(data.inmag.value)} <small className="font-sans text-sm">{data.inmag.unit}</small></p><p className="mt-4 text-xs text-white/60">Referencia de mercado · {data.marketDate}</p></article>}
      {!compact && <article className="overflow-x-auto border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8"><p className="eyebrow text-[hsl(var(--destructive))]">Hacienda</p><table className="mt-5 w-full min-w-[520px] text-left text-sm"><thead><tr className="border-b border-[hsl(var(--border))] text-xs uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]"><th className="pb-3 font-normal">Categoría</th><th className="pb-3 font-normal">Mínimo</th><th className="pb-3 font-normal">Máximo</th><th className="pb-3 font-normal">Promedio</th><th className="pb-3 font-normal">Unidad</th></tr></thead><tbody>{data.livestock.length ? data.livestock.slice(0, 8).map((row) => <tr key={row.category} className="border-b border-[hsl(var(--border))]"><td className="py-3">{row.category}</td><td className="py-3 tabular-nums">{value(row.min)}</td><td className="py-3 tabular-nums">{value(row.max)}</td><td className="py-3 tabular-nums">{value(row.average)}</td><td className="py-3">{row.unit ?? "S/C"}</td></tr>) : <tr><td colSpan={5} className="py-4 text-sm text-[hsl(var(--muted-foreground))]">Sin categorías publicadas.</td></tr>}</tbody></table></article>}
      <article className="border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"><p className="eyebrow text-[hsl(var(--destructive))]">Cereales</p><div className="mt-5 space-y-3">{highlighted.length ? highlighted.map((row) => <div key={row.name} className="flex justify-between gap-4 border-b border-[hsl(var(--border))] pb-2 text-sm"><span>{row.name}</span><strong>{value(row.price)} {row.unit}</strong></div>) : <p className="text-sm text-[hsl(var(--muted-foreground))]">Sin cereales publicados.</p>}</div></article>
    </div>
    {!compact && <p className="mt-6 text-xs text-[hsl(var(--muted-foreground))]">Valores informativos. Confirmá condiciones y disponibilidad antes de operar.</p>}
    {compact ? <Link href="/mercados" className="mt-6 inline-flex items-center gap-2 border-b border-[hsl(var(--primary))] pb-2 text-sm font-bold text-[hsl(var(--primary))]">Ver mercado completo <ArrowUpRight className="h-4 w-4" /></Link> : <div className="mt-7 flex flex-wrap items-center gap-5"><Link href="/contacto" className="inline-flex items-center gap-2 bg-[hsl(var(--accent))] px-5 py-3 text-sm font-bold text-[hsl(var(--foreground))]">Consultar una operación con IMAG <ArrowUpRight className="h-4 w-4" /></Link>{failed && <span className="inline-flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]"><RefreshCw className="h-4 w-4" /> Verificá las fuentes antes de operar.</span>}</div>}
    <Sources />
  </div>;
}