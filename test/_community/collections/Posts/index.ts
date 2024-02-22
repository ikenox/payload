import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    { name: 'tag', type: 'select', hasMany: true, options: ['tag1', 'tag2', 'tag3'] },
  ],
  versions: { drafts: true },
  slug: postsSlug,
}
