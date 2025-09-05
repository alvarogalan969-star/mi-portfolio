// contentlayer.config.ts
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
var Links = defineNestedType(() => ({
  name: "Links",
  fields: {
    demo: { type: "string", required: false },
    repo: { type: "string", required: false }
  }
}));
var Project = defineDocumentType(() => ({
  name: "Project",
  contentType: "mdx",
  filePathPattern: "projects/**/*.mdx",
  // o 'projects/*.mdx' si no anidas carpetas
  fields: {
    title: { type: "string", required: true },
    summary: { type: "string", required: true },
    date: { type: "date", required: false },
    tech: { type: "list", of: { type: "string" }, required: false },
    images: { type: "list", of: { type: "string" }, required: true },
    links: { type: "nested", of: Links, required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^projects\//, "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/proyectos/${doc._raw.flattenedPath.replace(/^projects\//, "")}`
    },
    cover: {
      type: "string",
      resolve: (doc) => doc.images?.[0] ?? "cover.jpg"
    },
    coverUrl: {
      type: "string",
      resolve: (doc) => `/projects/${doc._raw.flattenedPath.replace(/^projects\//, "")}/${doc.images?.[0] ?? "cover.jpg"}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Project],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]]
  }
});
export {
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-Q2XHJ3Y7.mjs.map
