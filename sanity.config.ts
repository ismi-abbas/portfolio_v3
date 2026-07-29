import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { markdownSchema } from 'sanity-plugin-markdown';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  projectId: 'twb7fz1z',
  dataset: 'site-blog',
  title: 'Ismi Abbas Blog',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Blog Posts').schemaType('post').child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem().title('Authors').schemaType('author').child(S.documentTypeList('author').title('Authors')),
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Categories')),
          ]),
    }),
    codeInput(),
    markdownSchema(),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
