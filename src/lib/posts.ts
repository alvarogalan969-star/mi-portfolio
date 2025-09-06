import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog", "posts");

export function getAllPosts() {
    if (!fs.existsSync(BLOG_DIR)) return [];
    return fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith(".mdx"))
    .map(filename => {
        const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
        const { data } = matter(raw);
        const slug = filename.replace(/\.mdx$/, "");
        return { slug, ...data };
    });
}
