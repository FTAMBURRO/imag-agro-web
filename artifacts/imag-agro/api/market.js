const clean = (value) => typeof value === "string" || typeof value === "number" ? value : undefined;
const fieldsOf = (record) => {
  if (!record || typeof record !== "object") return {};
  const fields = record.fields;
  return fields && typeof fields === "object" ? fields : record;
};
const field = (fields, names) => names.map((name) => fields[name]).find((value) => value !== undefined && value !== null && value !== "");
const dateKey = (value) => value.slice(0, 10);

function normalize(record) {
  const fields = fieldsOf(record);
  const marketDate = clean(field(fields, ["marketDate", "MarketDate", "Fecha", "fecha"]));
  if (!marketDate) return null;
  const rows = (value) => Array.isArray(value) ? value : [];
  const livestock = rows(field(fields, ["livestock", "Hacienda", "hacienda"])).flatMap((item) => {
    const source = fieldsOf(item);
    const category = clean(field(source, ["category", "Categoría", "categoria"]));
    return category === undefined ? [] : [{ category: String(category), min: clean(field(source, ["min", "Mínimo", "minimo"])), max: clean(field(source, ["max", "Máximo", "maximo"])), average: clean(field(source, ["average", "Promedio", "promedio"])), unit: clean(field(source, ["unit", "Unidad", "unidad"])) }];
  });
  const grains = rows(field(fields, ["grains", "Cereales", "cereales"])).flatMap((item) => {
    const source = fieldsOf(item);
    const name = clean(field(source, ["name", "Nombre", "nombre"]));
    const price = clean(field(source, ["price", "Precio", "precio"]));
    return name === undefined || price === undefined ? [] : [{ name: String(name), price, unit: clean(field(source, ["unit", "Unidad", "unidad"])) }];
  });
  const today = new Date();
  const inmagValue = clean(field(fields, ["inmag", "INMAG", "Inmag"]));
  return { marketDate: String(marketDate), updatedAt: String(clean(field(fields, ["updatedAt", "Actualizado", "actualizado"])) ?? today.toISOString()), status: dateKey(String(marketDate)) === today.toISOString().slice(0, 10) ? "live" : "stale", inmag: inmagValue === undefined ? undefined : { value: inmagValue, unit: clean(field(fields, ["inmagUnit", "Unidad INMAG"])) }, livestock, grains };
}

export default async function handler(_request, response) {
  response.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate=86400");
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID } = process.env;
  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID) {
    response.status(200).json({ status: "unavailable" });
    return;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const query = new URLSearchParams({ maxRecords: "10", sort: JSON.stringify([{ field: "Fecha", direction: "desc" }]) });
    const result = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(AIRTABLE_BASE_ID)}/${encodeURIComponent(AIRTABLE_TABLE_ID)}?${query}`, { headers: { Authorization: `Bearer ${AIRTABLE_PAT}` }, signal: controller.signal });
    if (!result.ok) {
      response.status(200).json({ status: "unavailable" });
      return;
    }
    const payload = await result.json();
    const records = payload && typeof payload === "object" && Array.isArray(payload.records) ? payload.records : [];
    response.status(200).json(records.map(normalize).find(Boolean) ?? { status: "unavailable" });
  } catch {
    response.status(200).json({ status: "unavailable" });
  } finally {
    clearTimeout(timeout);
  }
}