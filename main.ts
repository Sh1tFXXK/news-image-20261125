// A working news-image-daily entry (Node 22, standard library only): its image is the entry.png beside this file, and
// the program copies it to /output/entry.png. The image is the entry itself: a one-page newspaper front page
// summing up Wednesday 25 November 2026 in a single image.
//
// The copy is verified: a zero-byte source is refused up front, and after copying the destination must match
// the source's byte count, so a partial write can never pass as the entry.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);
if (!existsSync(source)) {
  throw new Error('entry.png is missing beside main.ts');
}
const sourceBytes = statSync(source).size;
if (sourceBytes === 0) {
  throw new Error('entry.png is empty');
}
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, 'entry.png');
copyFileSync(source, dest);
const destBytes = statSync(dest).size;
if (destBytes !== sourceBytes) {
  throw new Error(`entry.png copy incomplete: wrote ${destBytes} of ${sourceBytes} bytes`);
}
console.log(`wrote ${dest} (${destBytes} bytes)`);
