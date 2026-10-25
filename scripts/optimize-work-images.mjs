import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = path.resolve(
  process.cwd(),
  "..",
  "web-20261025T104311Z-1-001",
  "web",
);
const outputRoot = path.resolve(process.cwd(), "public", "work");

const projects = {
  "Acan Nusersy": "acan-nursery",
  "Best Quality": "best-quality",
  bridgestone: "bridgestone",
  "bright Touch": "bright-touch",
  Dawaii: "dawaii",
  Elmersal: "al-mersal",
  Hadaq: "hadaq",
  Healthy: "healthy",
  "Kabab Factory": "kabab-factory",
  Makebtek: "makebtek",
  MangTalaat: "mango-talaat",
  mona: "mona-clinic",
  "Next Level": "next-level",
  "Prime Clinc": "prime-clinic",
  "Rarus Perfume": "rarus",
  sent: "sent-hearing",
  "Shawerma Factory": "shawarma-factory",
  Soft: "soft",
  Sovia: "sovia",
  Spotless: "spotless",
  V602: "v60-coffee",
  Wallstreet: "wallstreet",
  Zena: "zeina-clinic",
};

const imagePattern = /\.(?:jpe?g|png|webp)$/i;
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(fullPath) : imagePattern.test(entry.name) ? [fullPath] : [];
    }),
  );
  return files.flat();
}

async function usablePost(file, projectDirectory) {
  // The files stored directly in each project folder are large contact sheets.
  if (path.dirname(file) === projectDirectory) return false;
  const image = sharp(file);
  const { width = 0, height = 0 } = await image.metadata();
  const ratio = width / height;
  if (!(width >= 700 && width <= 1600 && height >= 700 && ratio >= 0.7 && ratio <= 1.1)) return false;
  const { entropy } = await image.stats();
  // A few sliced source files are empty colour fields, not usable posts.
  return entropy >= 1.5;
}

for (const [sourceName, slug] of Object.entries(projects)) {
  const projectDirectory = path.join(sourceRoot, sourceName);
  const targetDirectory = path.join(outputRoot, slug);
  const candidates = (await walk(projectDirectory)).sort((a, b) =>
    collator.compare(path.relative(projectDirectory, a), path.relative(projectDirectory, b)),
  );
  const posts = [];
  for (const file of candidates) {
    if (await usablePost(file, projectDirectory)) posts.push(file);
  }

  await fs.mkdir(targetDirectory, { recursive: true });
  const oldExports = (await fs.readdir(targetDirectory)).filter((file) => /^\d+\.webp$/.test(file));
  await Promise.all(oldExports.map((file) => fs.unlink(path.join(targetDirectory, file))));
  await Promise.all(
    posts.map((file, index) =>
      sharp(file)
        .rotate()
        .resize({ width: 1080, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6, smartSubsample: true })
        .toFile(path.join(targetDirectory, `${String(index + 1).padStart(2, "0")}.webp`)),
    ),
  );
  console.log(`${slug}: ${posts.length}`);
}

console.log("tablia: kept existing images (no replacement source was supplied)");
