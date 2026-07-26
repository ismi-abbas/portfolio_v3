/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly PUBLIC_SANITY_PROJECT_ID?: string;
  readonly PUBLIC_SANITY_DATASET?: string;
  readonly PUBLIC_SANITY_VISUAL_EDITING_ENABLED?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ContactDatabaseStatement {
  bind(...values: Array<string | number | null>): ContactDatabaseStatement;
  run(): Promise<{ success: boolean; error?: string }>;
}

interface ContactDatabase {
  prepare(query: string): ContactDatabaseStatement;
}

type CloudflareRuntime = import('@astrojs/cloudflare').Runtime<{
  CONTACT_DB: ContactDatabase;
}>;

declare namespace App {
  interface Locals extends CloudflareRuntime {}
}
