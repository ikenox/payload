import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { mediaSlug } from '../Media'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'select',
      required: true,
      hasMany: true,
      options: ['a', 'b', 'c'],
    },
  ],
  slug: postsSlug,
}
