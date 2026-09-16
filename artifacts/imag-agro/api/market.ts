type Context = { res: { status: (code: number) => Context["res"]; setHeader: (name: string, value: string) => void; json: (body: unknown) => void } };

const clean = (value: unknown) => typeof value === "string" || typeof value === "number" ? value : undefined;
const fieldsOf = (record: unknown): Record<string, unknown> => {
  if (!record || typeof record !== "object") return {};
  const fields = (record as { fields?: unknown }).fields;
  return fields && typeof fields === "object" ? fields as Record<string, unknown> : record as Record<string, unknown>;
};
const field = (fields: Record<string, unknown>, names: string[]) => names.map((name) => fields[name]).find((value) => value !== undefined && value !== null && value !== "");
const dateKey = (value: string) => value.slice(0, 10);

function normalize(record: unknown) {
  const fields = fieldsOf(record);
  const marketDate = clean(field(fields, ["marketDate", "MarketDate", "Fecha", "fecha"]));
  if (!marketDate) return null;
  const rows = (value: unknown) => Array.isArray(value) ? value : [];
  const livestock = rows(field(fields, ["livestock", "Hacienda", "hacienda"])).flatMap((item) => {
    const source = fieldsOf(item); const category = clean(field(source, ["category", "Categoría", "categoria"]));
    return category === undefined ? [] : [{ category: String(category), min: clean(field(source, ["min", "Mínimo", "minimo"])), max: clean(field(source, ["max", "Máximo", "maximo"])), average: clean(field(source, ["average", "Promedio", "promedio"])), unit: clean(field(source, ["unit", "Unidad", "unidad"])) }];
  });
  const grains = rows(field(fields, ["grains", "Cereales", "cereales"])).flatMap((item) => {
    const source = fieldsOf(item); const name = clean(field(source, ["name", "Nombre", "nombre"])); const price = clean(field(source, ["price", "Precio", "precio"]));
    return name === undefined || price === undefined ? [] : [{ name: String(name), price, unit: clean(field(source, ["unit", "Unidad", "unidad"])) }];
  });
  const today = new Date();
  return { marketDate: String(marketDate), updatedAt: String(clean(field(fields, ["updatedAt", "Actualizado", "actualizado"])) ?? today.toISOString()), status: dateKey(String(marketDate)) === today.toISOString().slice(0, 10) ? "live" : "stale", inmag: clean(field(fields, ["inmag", "INMAG", "Inmag"])) === undefined ? undefined : { value: clean(field(fields, ["inmag", "INMAG", "Inmag"])), unit: clean(field(fields, ["inmagUnit", "Unidad INMAG"])) }, livestock, grains };
}

export default async function handler(_req: unknown, { res }: Context) {
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=86400");
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } = process.env;
  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) { res.status(200).json({ status: "unavailable" }); return; }
  const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const query = new URLSearchParams({ maxRecords: "10", sort: JSON.stringify([{ field: "Fecha", direction: "desc" }]) });
    const response = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(AIRTABLE_BASE_ID)}/${encodeURIComponent(AIRTABLE_TABLE_ID)}?${query}`, { headers: { Authorization: `Bearer ${AIRTABLE_PAT}` }, signal: controller.signal });
    if (!response.ok) { res.status(200).json({ status: "unavailable" }); return; }
    const payload: unknown = await response.json();
    const records = payload && typeof payload === "object" && Array.isArray((payload as { records?: unknown }).records) ? (payload as { records: unknown[] }).records : [];
    const normalized = records.map(normalize).filter(Boolean)[0] ?? null;
    res.status(200).json(normalized ?? { status: "unavailable" });
  } catch { res.status(200).json({ status: "unavailable" }); } finally { clearTimeout(timeout); }
}