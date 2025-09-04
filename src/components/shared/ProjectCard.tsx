// src/components/shared/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/types/content';
import React from "react";


export default function ProjectCard({ project }: { project: Project }) {
  const { slug, title, summary, tags, cover, repoUrl, demoUrl } = project;
  return (
    <article className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition">
      {cover && (
        <div className="mb-3 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={cover}
            alt={title}
            width={1200}
            height={675}        // 16:9
            className="w-full h-auto block pointer-events-none" // evita capturar clics
            sizes="(min-width: 640px) 50vw, 100vw"
            priority={false}
          />
        </div>
      )}
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-700 mb-3">{summary}</p>

      {Array.isArray(tags) && tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-4 text-xs text-gray-600">
          {tags.map((t) => (
            <li key={t} className="px-2 py-1 rounded-full border border-gray-200">
              {t}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3 text-sm">
        <Link href={`/projects/${slug}`} className="no-underline text-black underline-offset-4">
          Detalles
        </Link>
        {demoUrl && (
          <a href={demoUrl} className="no-underline" target="_blank" rel="noreferrer">
            Demo
          </a>
        )}
        {repoUrl && (
          <a href={repoUrl} className="no-underline" target="_blank" rel="noreferrer">
            Repo
          </a>
        )}
      </div>
    </article>
  );
}
