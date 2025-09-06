import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const draftsDir = path.join(process.cwd(), "content", "blog", "drafts");
const postsDir = path.join(process.cwd(), "content", "blog", "posts");

function publishDuePosts() {
  if (!fs.existsSync(draftsDir)) {
    console.log("[SKIP] No existe drafts:", draftsDir);
    return;
  }

  // Asegura que exista posts/
  fs.mkdirSync(postsDir, { recursive: true });

  const files = fs.readdirSync(draftsDir).filter(f => /\.mdx?$/i.test(f));
  console.log("[INFO] Drafts encontrados:", files);

  for (const file of files) {
    const full = path.join(draftsDir, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data } = matter(raw);

    const publishAtStr = data.publishAt as string | undefined;
    const publishAt = publishAtStr ? new Date(publishAtStr) : null;
    const now = new Date();

    console.log(`[CHECK] ${file} publishAt=${publishAtStr ?? "null"} now=${now.toISOString()}`);

    if (!publishAt || isNaN(publishAt.getTime())) {
      console.log(`[SKIP] ${file} sin publishAt válido`);
      continue;
    }

    if (publishAt <= now) {
      const target = path.join(postsDir, file);
      fs.renameSync(full, target);
      console.log(`[PUBLISH] Movido a posts: ${file}`);
    } else {
      console.log(`[WAIT] ${file} todavía no vence`);
    }
  }
}

function ensureDraftsDir() {
  if (!fs.existsSync(draftsDir)) {
    fs.mkdirSync(draftsDir, { recursive: true });
  }
  const files = fs.readdirSync(draftsDir).filter(f => !f.startsWith("."));
  if (files.length === 0) {
    const keepFile = path.join(draftsDir, ".gitkeep");
    fs.writeFileSync(keepFile, "");
    console.log("[INFO] .gitkeep añadido en drafts/");
  }
}

publishDuePosts();
ensureDraftsDir();
