/**
 * Ottimizza tutte le immagini in public/ con Sharp.
 * Esegui con: node scripts/optimize-images.js
 * Output: public/optimized/ — i file originali non vengono toccati.
 */

import sharp from 'sharp';
import { readdirSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, extname, basename } from 'path';

const INPUT_DIR  = 'public';
const OUTPUT_DIR = 'public/optimized';
const EXTS       = ['.jpg', '.jpeg', '.png', '.webp'];
const SKIP       = ['og-image.jpg', 'icon-192.png', 'icon-512.png']; // già ottimizzati

if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });

const files = readdirSync(INPUT_DIR).filter(f => {
  const ext = extname(f).toLowerCase();
  return EXTS.includes(ext) && !SKIP.includes(f);
});

let totalBefore = 0;
let totalAfter  = 0;

for (const file of files) {
  const inputPath  = join(INPUT_DIR, file);
  const ext        = extname(file).toLowerCase();
  const name       = basename(file, ext);
  const outputPath = join(OUTPUT_DIR, `${name}.webp`);

  const sizeBefore = statSync(inputPath).size;
  totalBefore += sizeBefore;

  const quality = ext === '.png' ? 80 : 78;

  await sharp(inputPath)
    .webp({ quality })
    .toFile(outputPath);

  const sizeAfter = statSync(outputPath).size;
  totalAfter += sizeAfter;

  const saved = Math.round((1 - sizeAfter / sizeBefore) * 100);
  console.log(`✓ ${file} → ${name}.webp  (${saved}% risparmiato)`);
}

console.log(`\nTotale: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB`);
