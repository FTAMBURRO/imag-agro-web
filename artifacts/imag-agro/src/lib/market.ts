export type MarketStatus = "live" | "stale" | "unavailable";

export type MarketData = {
  marketDate: string;
  updatedAt: string;
  status: MarketStatus;
  inmag?: { value: string | number; unit?: string };
  livestock: Array<{ category: string; min?: string | number; max?: string | number; average?: string | number; unit?: string }>;
  grains: Array<{ name: string; price: string | number; unit?: string }>;
};

const text = (value: unknown) => typeof value === "string" || typeof value === "number" ? value : undefined;
const fieldsOf = (record: unknown): Record<string, unknown> => {
  if (!record || typeof record !== "object") return {};
  const candidate = record as { fields?: unknown };
  return candidate.fields && typeof candidate.fields === "object" ? candidate.fields as Record<string, unknown> : record as Record<string, unknown>;
};
const field = (fields: Record<string, unknown>, names: string[]) => names.map((name) => fields[name]).find((value) => value !== undefined && value !== null && value !== "");
const dateKey = (value: string) => value.slice(0, 10);

export function normalizeMarketRecord(record: unknown, now = new Date()): MarketData | null {
  const fields = fieldsOf(record);
  const date = text(field(fields, ["marketDate", "MarketDate", "Fecha", "fecha"]));
  if (!date) return null;
  const livestock = Array.isArray(field(fields, ["livestock", "Hacienda", "hacienda"])) ? field(fields, ["livestock", "Hacienda", "hacienda"]) as unknown[] : [];
  const grains = Array.isArray(field(fields, ["grains", "Cereales", "cereales"])) ? field(fields, ["grains", "Cereales", "cereales"]) as unknown[] : [];
  const mapLivestock = livestock.flatMap((item) => {
    const source = fieldsOf(item);
    const category = text(field(source, ["category", "Categoría", "categoria"]));
    return category ? [{ category: String(category), min: text(field(source, ["min", "Mínimo", "minimo"])), max: text(field(source, ["max", "Máximo", "maximo"])), average: text(field(source, ["average", "Promedio", "promedio"])), unit: text(field(source, ["unit", "Unidad", "unidad"])) }] : [];
  });
  const mapGrains = grains.flatMap((item) => {
    const source = fieldsOf(item);
    const name = text(field(source, ["name", "Nombre", "nombre"]));
    const price = text(field(source, ["price", "Precio", "precio"]));
    return name !== undefined && price !== undefined ? [{ name: String(name), price, unit: text(field(source, ["unit", "Unidad", "unidad"])) }] : [];
  });
  const inmagValue = text(field(fields, ["inmag", "INMAG", "Inmag"]));
  const unit = text(field(fields, ["inmagUnit", "Unidad INMAG"]));
  return { marketDate: String(date), updatedAt: String(text(field(fields, ["updatedAt", "Actualizado", "actualizado"])) ?? now.toISOString()), status: dateKey(String(date)) === now.toISOString().slice(0, 10) ? "live" : "stale", inmag: inmagValue === undefined ? undefined : { value: inmagValue, unit: unit === undefined ? undefined : String(unit) }, livestock: mapLivestock.map((item) => ({ ...item, unit: item.unit === undefined ? undefined : String(item.unit) })), grains: mapGrains.map((item) => ({ ...item, unit: item.unit === undefined ? undefined : String(item.unit) })) };
}

export const marketFallbackMessage = "Los valores de esta jornada todavía no fueron publicados.";