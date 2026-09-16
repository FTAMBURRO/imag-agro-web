import assert from "node:assert/strict";
import { normalizeMarketRecord } from "./market";

const today = new Date("2026-09-16T12:00:00Z");
const current = normalizeMarketRecord({ fields: { Fecha: "2026-09-16", INMAG: 125000, "Unidad INMAG": "$/kg", Hacienda: [{ Categoría: "Novillos", Promedio: 3000, Unidad: "$ / kg" }], Cereales: [{ Nombre: "Maíz", Precio: 180, Unidad: "USD/t" }] } }, today);
assert.equal(current?.status, "live");
assert.equal(current?.inmag?.value, 125000);
assert.equal(current?.livestock[0]?.category, "Novillos");
assert.equal(current?.grains[0]?.unit, "USD/t");

const old = normalizeMarketRecord({ fields: { fecha: "2026-09-15" } }, today);
assert.equal(old?.status, "stale");
assert.equal(normalizeMarketRecord({ fields: { INMAG: 1 } }, today), null);
assert.equal(normalizeMarketRecord("malformed", today), null);
console.log("Market normalizer tests passed.");