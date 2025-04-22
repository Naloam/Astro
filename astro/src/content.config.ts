import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";
import { getFileDates } from "@/utils/getFileDate";
import path from "path";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date().transform((val, ctx) => {
        // 如果提供了日期，使用提供的日期
        if (val) return val;
        
        // 否则使用文件创建时间
        const filePath = path.join(process.cwd(), BLOG_PATH, ctx.path.join('/'));
        const dates = getFileDates(filePath);
        return dates.created;
      }),
      modDatetime: z.date().optional().nullable().transform((val, ctx) => {
        // 如果提供了修改日期，使用提供的日期
        if (val) return val;
        
        // 否则使用文件修改时间
        const filePath = path.join(process.cwd(), BLOG_PATH, ctx.path.join('/'));
        const dates = getFileDates(filePath);
        return dates.modified;
      }),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

export const collections = { blog };
