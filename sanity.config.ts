import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schema';

export default defineConfig({
  name: 'ismi-abbas-blog',
  title: 'ismi-abbas Blog',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema,
});
