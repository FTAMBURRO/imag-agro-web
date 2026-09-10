import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/', import.meta.url));
const files = [];

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (/\.(ts|tsx|css)$/.test(entry.name)) files.push(path);
  }
}

await collect(root);

const findings = [];
for (const file of files) {
  const source = await readFile(file, 'utf8');
  if (source.includes('TODO') || source.includes('FIXME')) {
    findings.push(`${file}: contiene TODO/FIXME`);
  }
  if (/https?:\/\/(?!wa\.me\/message|www\.w3\.org)/.test(source)) {
    findings.push(`${file}: contiene una URL externa que requiere revisión`);
  }
}

if (findings.length) {
  console.error(findings.join('\n'));
  process.exit(1);
}

console.log(`Lint IMAG Agro: ${files.length} archivos revisados.`);