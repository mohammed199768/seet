/**
 * Static responsive variants for next/image (src/lib/image-loader.ts).
 *
 * Image optimization is off on the host, so instead of a runtime optimizer every raster under
 * public/{work,media,brand} gets fixed-width WebP copies at public/img/<width>/<path>, one per
 * ladder width below the source width. The loader picks them from the srcset widths Next asks for.
 *
 * Runs before dev and build. Encodes are kept in .next/cache (which the host keeps between
 * builds) keyed by a hash of the source, so only new or changed images are re-encoded.
 */
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const outDir = path.join(publicDir, "img");
const cacheDir = path.join(root, ".next", "cache", "image-variants");
const cacheIndex = path.join(cacheDir, "index.json");
const manifestFile = path.join(root, "src", "lib", "image-variants.json");

// next.config.ts reads imageSizes + deviceSizes from the manifest, so srcset widths always match the files.
const imageSizes = [160, 320, 480];
const deviceSizes = [640, 828, 1080, 1280, 1600, 1920, 2400];
const ladder = [...imageSizes, ...deviceSizes];
// Most sources are 1080px posts; only sources whose largest variant differs are listed in the manifest.
const defaultCap = 828;

const sources = {
  work: { quality: 80 },
  media: { quality: 82 },
  brand: { quality: 92 },
};
const raster = /\.(?:webp|jpe?g|png)$/i;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true }).catch(() => []);
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      return e.isDirectory() ? walk(full) : raster.test(e.name) ? [full] : [];
    }),
  );
  return files.flat();
}

const exists = (file) => fs.access(file).then(() => true, () => false);
const mtime = (file) => fs.stat(file).then((s) => s.mtimeMs, () => 0);

async function pool(items, size, fn) {
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) await fn(items[i++]);
    }),
  );
}

const jobs = [];
for (const [dir, opts] of Object.entries(sources)) {
  for (const file of await walk(path.join(publicDir, dir))) {
    // brand PNGs are the full-size masters used by structured data; next/image uses the WebP copies
    if (dir === "brand" && !file.endsWith(".webp")) continue;
    jobs.push({ file, opts });
  }
}

const index = JSON.parse(await fs.readFile(cacheIndex, "utf8").catch(() => "{}"));
const nextIndex = {};
const caps = {};
const wanted = new Set();
let encoded = 0;
let copied = 0;

await pool(jobs, Math.max(2, Math.min(8, os.cpus().length)), async ({ file, opts }) => {
  const rel = path.relative(publicDir, file).split(path.sep).join("/");
  const src = `/${rel}`;
  const bytes = await fs.readFile(file);
  const hash = createHash("sha1").update(bytes).update(JSON.stringify(opts)).digest("hex");
  const { width = 0 } = await sharp(bytes).metadata();
  const widths = ladder.filter((w) => w < width);
  const cap = widths.at(-1) ?? 0;
  if (cap !== defaultCap) caps[src] = cap;
  nextIndex[src] = hash;

  for (const w of widths) {
    const variant = `${w}/${rel.replace(raster, ".webp")}`;
    const cached = path.join(cacheDir, variant);
    const target = path.join(outDir, variant);
    wanted.add(variant);
    if (index[src] !== hash || !(await exists(cached))) {
      await fs.mkdir(path.dirname(cached), { recursive: true });
      await sharp(bytes)
        .resize({ width: w })
        .webp({ quality: opts.quality, alphaQuality: 100, effort: 5, smartSubsample: true })
        .toFile(cached);
      encoded++;
    }
    if ((await mtime(target)) < (await mtime(cached))) {
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.copyFile(cached, target);
      copied++;
    }
  }
});

// Drop variants whose source is gone or no longer needs that width.
let removed = 0;
for (const dir of [outDir, cacheDir]) {
  for (const file of await walk(dir)) {
    if (!wanted.has(path.relative(dir, file).split(path.sep).join("/"))) {
      await fs.unlink(file);
      removed++;
    }
  }
}
await fs.mkdir(cacheDir, { recursive: true });
await fs.writeFile(cacheIndex, JSON.stringify(nextIndex));

const sorted = Object.fromEntries(Object.entries(caps).sort(([a], [b]) => a.localeCompare(b)));
const manifest = `${JSON.stringify({ imageSizes, deviceSizes, defaultCap, caps: sorted }, null, 1)}\n`;
// compare without CRs: Windows checkouts may hold the committed file with CRLF endings
const previous = await fs.readFile(manifestFile, "utf8").catch(() => "");
if (previous.replace(/\r\n/g, "\n") !== manifest) await fs.writeFile(manifestFile, manifest);

console.log(`image variants: ${jobs.length} sources, ${encoded} encoded, ${copied} copied, ${removed} removed`);
