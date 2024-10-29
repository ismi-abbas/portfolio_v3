import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import post from './schema/post';

const projectId = import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID! || import.meta.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset = import.meta.env.PUBLIC_SANITY_STUDIO_DATASET! || import.meta.env.PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: 'ismi-abbas-site-blog',
  title: 'Ismi Abbas Site Blog',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: [post],
  },
});
