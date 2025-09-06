import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const draftsDir = path.join(process.cwd(), "content", "blog", "drafts");
const postsDir = path.join(process.cwd(), "content", "blog", "posts");

function publishDuePosts() {
    if (!fs.existsSync(draftsDir)) return;

    const files = fs.readdirSync(draftsDir).filter(f => /\.mdx?$/i.test(f));

    for (const file of files) {
        const full = path.join(draftsDir, file);
        const raw = fs.readFileSync(full, "utf8");
        const { data } = matter(raw);

        const publishAt = data.publishAt ? new Date(data.publishAt) : null;
        if (!publishAt) continue;

        if (publishAt <= new Date()) {
        const target = path.join(postsDir, file);
        fs.renameSync(full, target);
        console.log(`Publicado: ${file}`);
        }
    }
}

publishDuePosts();
